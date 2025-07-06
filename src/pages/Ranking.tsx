'use client'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { RyuohsenClass } from '../enum/RyuohsenClass';
import { JunisenClass } from '../enum/JunisenClass';
import { Affiliation } from '../enum/Affiliation';
import type { Player } from '../types/player';
import { DateUtils } from '../utils/DateUtils';
import { jsonKishi } from '../data/playersJson';
import { latestRatings, statsMap } from '../data/ratingHistoryJson';

const sortOptions = [
  { name: "Rate" },
  { name: "勝率"},
  { name: "勝数"},
  { name: "対局数"},
  { name: "年齢 (昇順)"},
  { name: "デビュー年齢 (昇順)"},
]
const filters = [
  {
    id: "ryuohsenClass",
    name: "竜王戦",
    options: [
      { value: RyuohsenClass.RYUOH, label: RyuohsenClass.RYUOH },
      { value: RyuohsenClass.CLASS_1, label: RyuohsenClass.CLASS_1 },
      { value: RyuohsenClass.CLASS_2, label: RyuohsenClass.CLASS_2 },
    ],
  },
  {
    id: "junisenClass",
    name: "順位戦",
    options: [
      { value: JunisenClass.MEIJIN, label: JunisenClass.MEIJIN },
      { value: JunisenClass.A, label: JunisenClass.A },
      { value: JunisenClass.B1, label: JunisenClass.B1 },
    ],
  },
  {
    id: "affiliation",
    name: "所属",
    options: [
      { value: Affiliation.KANTOU, label: Affiliation.KANTOU },
      { value: Affiliation.KANSAI, label: Affiliation.KANSAI },
    ],
  },
]

const playersWithRating = jsonKishi.map((player) => {
  const rating = latestRatings.get(player.id);
  const stats = statsMap.get(player.id);

  return {
    ...player,
    rating: rating?.rating ?? 0,
    stats: stats,
    wins: stats?.wins ?? -1,
    total: stats?.total ?? -1,
    winRate: stats?.winRate ?? -1,
    maxStreak: stats?.maxStreak ?? -1,
  };
});

export default function Ranking() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: Set<string> }>({});
  const [sortKey, setSortKey] = useState<string>("Rate");
  const filteredData = playersWithRating
  .filter((kishi) => {
    return Object.entries(selectedFilters).every(([key, set]) => {
      if (set.size === 0) return true;
      const k = key as keyof Player;
      return set.has(String(kishi[k]));
    });
  })
  .sort((a, b) => {
    const getWinRate = (k: typeof a) =>
      k.stats && k.stats.total > 0
        ? k.stats.wins / k.stats.total
        : 0;

    if (sortKey === '勝率') {
      return getWinRate(b) - getWinRate(a);
    } else if (sortKey === '勝数') {
      return (b.wins || 0) - (a.wins || 0);
    } else if (sortKey === '対局数') {
      return (b.total || 0) - (a.total || 0);
    } else if (sortKey === 'Rate') {
    return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
});

  return (
    <div className="max-w-screen-md mx-auto">
    <div className="bg-gray-50">
      {/* Mobile filter dialog */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 sm:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pb-6 pt-4 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              {filters.map((section) => (
                <Disclosure key={section.name} as="div" className="border-t border-gray-200 px-4 py-6">
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                      <span className="font-medium text-gray-900">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5 rotate-0 transform group-data-[open]:-rotate-180"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                defaultValue={option.value}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                              >
                                <path
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                />
                                <path
                                  d="M3 7H11"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                />
                              </svg>
                            </div>
                          </div>
                          <label htmlFor={`filter-mobile-${section.id}-${optionIdx}`} className="text-sm text-gray-500">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <section aria-labelledby="filter-heading" className="py-6">
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-between">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <a
                        onClick={() => setSortKey(option.name)}
                        className="block px-4 py-2 text-sm font-medium text-gray-900 data-[focus]:bg-gray-100 data-[focus]:outline-none cursor-pointer"
                      >
                        {option.name}
                      </a>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
            >
              Filters
            </button>

            <PopoverGroup className="hidden sm:flex sm:items-baseline sm:space-x-8">
              {filters.map((section, sectionIdx) => (
                <Popover
                  key={section.name}
                  id={`desktop-menu-${sectionIdx}`}
                  className="relative inline-block text-left"
                >
                  <div>
                    <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <span>{section.name}</span>
                        {selectedFilters[section.id]?.size > 0 && (
                            <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                            {selectedFilters[section.id]?.size}
                            </span>
                        )}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </PopoverButton>
                  </div>

                  <PopoverPanel
                    transition
                    className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <form className="space-y-4">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                checked={selectedFilters[section.id]?.has(option.value) ?? false}
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setSelectedFilters((prev) => {
                                      const next = new Set(prev[section.id] || []);
                                      if (isChecked) next.add(option.value);
                                      else next.delete(option.value);
                                      return { ...prev, [section.id]: next };
                                    });
                                  }}
                              />
                              <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                              >
                                <path
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                />
                                <path
                                  d="M3 7H11"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                />
                              </svg>
                            </div>
                          </div>
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </form>
                  </PopoverPanel>
                </Popover>
              ))}
            </PopoverGroup>
          </div>
        </section>
      </div>
    </div>

    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    名前 (年齢 / デビュー年齢)
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    段位
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    所属
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    順位戦
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    竜王戦
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    勝敗
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    勝率
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    連勝
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredData.map((kishi) => (
                    <tr
                    key={kishi.kishiNumber}
                    onClick={() => navigate(`/players/kishi/${kishi.kishiNumber}`)}
                    className="cursor-pointer hover:bg-gray-100"
                    >
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="size-11 shrink-0">
                          <img alt="" src={kishi.imageUrl} className="ml-2 size-11 object-cover rounded-full" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{kishi.nameKana} 
                            <span className="text-xs text-gray-500"> ({DateUtils.getCurrentAge(kishi.birthDate)}歳 / {DateUtils.getDebutAge(kishi.birthDate, kishi.debutDate)}歳)</span>
                          </div>
                          <div className="mt-1 text-gray-500">{kishi.nameRome}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-center px-3 py-5 text-sm text-gray-500">{kishi.danni}</td>
                    <td className="whitespace-nowrap text-center px-3 py-5 text-sm text-gray-500">{kishi.affiliation}</td>
                    <td className="whitespace-nowrap text-center px-3 py-5 text-sm text-gray-500">{kishi.junisenClass}</td>
                    <td className="whitespace-nowrap text-center px-3 py-5 text-sm text-gray-500">{kishi.ryuohsenClass}</td>
                    <td className="whitespace-nowrap text-center px-3 py-5 text-sm text-gray-500">{kishi.stats ? `${kishi.stats.wins}-${kishi.stats.total - kishi.stats.wins}` : "-"}</td>
                    <td className="whitespace-nowrap text-center px-3 py-5 text-sm text-gray-500">
                        {kishi.stats && (kishi.stats.total > 0) ? (
                        <>
                        {((kishi.stats.wins / (kishi.stats.total))).toFixed(2)}
                        </>
                        ) : (
                        "-"
                        )}</td>
                    <td className="whitespace-nowrap text-center px-3 py-5 text-sm text-gray-500">{kishi.stats ? `${kishi.stats.maxStreak}` : "-"}</td>
                    <td className="whitespace-nowrap text-center px-3 py-5 text-sm text-gray-500">{kishi.rating.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</div>
  )
}
