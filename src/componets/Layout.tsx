import { useEffect, useState, useRef } from 'react';
import { Disclosure, DisclosureButton, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { fetchPlayers } from '../data/playersJson';
import type { Player } from '../types/player';
import { getSlug, PlayerCategory } from '../enum/PlayerCategory';

const navItems = [
  { name: 'Home', href: ['/'], current: true },
  { name: '棋士一覧', href: ['/players/kishi', '/players/joryu'], current: false },
  { name: 'ランキング', href: ['/ranking/kishi', '/ranking/joryu'], current: false },
  { name: 'おすすめ棋書', href: ['/books'], current: false },
];

const listOptions = [
  { name: '棋士一覧', href: "/players/kishi" },
  { name: '女流棋士一覧', href: "/players/joryu" },
]

const rankingOptions = [
  { name: '棋士ランキング', href: "/ranking/kishi" },
  { name: '女流棋士ランキング', href: "/ranking/joryu" },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState(navItems);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNavigation(
      navItems.map((item) => ({
        ...item,
        current: item.href.includes(location.pathname),
      }))
    );
  }, [location.pathname]);

  const [allPlayers, setAllPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetchPlayers().then(players => {
      setAllPlayers(players);
    }).catch(() => {
      setAllPlayers([]);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPlayers([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = allPlayers.filter((player: Player) =>
      player.nameKana.includes(searchTerm) || player.nameRome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayers(filtered);
    setShowSuggestions(true);
  }, [searchTerm, allPlayers]);

  const handleSelectPlayer = (kishiNumber: number, playerCategory: PlayerCategory) => {
    setSearchTerm('');
    setShowSuggestions(false);
    navigate(`/players/${getSlug(playerCategory)}/${kishiNumber}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click event to register
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <>
      {/* ナビゲーションバー */}
      <Disclosure as="header" className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
          <div className="relative flex h-16 justify-between">
            <div className="relative z-10 flex px-2 lg:px-0">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
              <div className="grid w-full grid-cols-1 sm:max-w-xs relative">
                <input
                  ref={inputRef}
                  name="search"
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onFocus={() => searchTerm && setShowSuggestions(true)}
                  className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  autoComplete="off"
                />
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                />
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 z-20 max-h-60 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    {filteredPlayers.length > 0 ? (
                      filteredPlayers.map((player) => (
                        <div
                          key={player.id}
                          className="flex cursor-pointer items-center gap-2 border-b border-gray-100 p-2 hover:bg-indigo-100"
                          onMouseDown={() => handleSelectPlayer(player.kishiNumber, player.playerCategory)}
                        >
                          <img
                            src={player.imageUrl}
                            alt={player.nameKana}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-gray-900">{player.nameKana}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-center text-sm text-gray-500">該当する棋士・女流棋士が見つかりません</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="relative z-10 flex items-center lg:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
          <nav aria-label="Global" className="hidden lg:flex lg:space-x-6 lg:py-2">
            {navigation.map((item) => {
              if (item.name === '棋士一覧') {
                return (
                  <Popover key={item.name} className="relative">
                    {({ close }) => (
                      <>
                        <PopoverButton
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                            'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium'
                          )}
                        >
                          <span>{item.name}</span>
                          <ChevronDownIcon aria-hidden="true" className="size-5" />
                        </PopoverButton>
                        <PopoverPanel
                          transition
                          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4 transition 
                            data-[closed]:translate-y-1 data-[closed]:opacity-0 
                            data-[enter]:duration-200 data-[leave]:duration-150 
                            data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="w-56 shrink rounded-xl bg-white p-4 text-sm/6 font-medium text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                            {listOptions.map((option) => (
                              <Link
                                key={option.name}
                                to={option.href}
                                className="block p-2 hover:text-indigo-600"
                                onClick={() => close()}
                              >
                                {option.name}
                              </Link>
                            ))}
                          </div>
                        </PopoverPanel>
                      </>
                    )}
                  </Popover>
                );
              }

              if (item.name === 'ランキング') {
                return (
                  <Popover key={item.name} className="relative">
                    <PopoverButton
                      className={classNames(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                        'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon aria-hidden="true" className="size-5" />
                    </PopoverButton>
                    <PopoverPanel
                      transition
                      className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4 transition 
                        data-[closed]:translate-y-1 data-[closed]:opacity-0 
                        data-[enter]:duration-200 data-[leave]:duration-150 
                        data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {({ close }) => (
                        <div className="w-56 shrink rounded-xl bg-white p-4 text-sm/6 font-medium text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                          {rankingOptions.map((option) => (
                            <Link
                              key={option.name}
                              to={option.href}
                              onClick={() => close()}
                              className="block p-2 hover:text-indigo-600"
                            >
                              {option.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </PopoverPanel>
                  </Popover>

                );
              }

              // 通常リンク
              return (
                <Link
                  key={item.name}
                  to={item.href[0]}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                    'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </Disclosure>
      {/* ナビゲーションバー */}

      <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Outlet />
          </div>
      </main>
    </>
  )
}
