"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaBus, FaCar, FaFilter, FaTrain } from "react-icons/fa";

const TRANSPORT_OPTIONS = [
  { value: "car", label: "Auto", Icon: FaCar },
  { value: "train", label: "Vlak", Icon: FaTrain },
  { value: "bus", label: "Bus", Icon: FaBus },
] as const;

const TRAIL_TYPE_OPTIONS = [
  { value: "AA", label: "A → A" },
  { value: "AB", label: "A → B" },
] as const;

const LENGTH_OPTIONS = [
  { value: "10", label: "do 10 km" },
  { value: "15", label: "do 15 km" },
  { value: "15plus", label: "nad 15 km" },
] as const;

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Lehká" },
  { value: "medium", label: "Střední" },
  { value: "hard", label: "Těžká" },
] as const;

function FilterPill({
  active,
  onClick,
  children,
  dataTestId,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dataTestId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
        active
          ? "border-amber-400 bg-amber-400"
          : "border-white bg-amber-100 text-gray-700 hover:border-amber-400"
      }`}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
}

export default function TrailFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTransport = searchParams.get("transport")?.split(",").filter(Boolean) ?? [];
  const activeTrailType = searchParams.get("trailType") ?? "";
  const activeLength = searchParams.get("length") ?? "";
  const activeDifficulty = searchParams.get("difficulty") ?? "";

  const hasActiveFilters =
    activeTransport.length > 0 || activeTrailType || activeLength || activeDifficulty;

  const filters = [
    {
      title: "Doprava",
      options: TRANSPORT_OPTIONS,
      key: "transport",
      activeFilter: activeTransport,
    },
    {
      title: "Typ trasy",
      options: TRAIL_TYPE_OPTIONS,
      key: "trailType",
      activeFilter: activeTrailType,
    },
    {
      title: "Délka",
      options: LENGTH_OPTIONS,
      key: "length",
      activeFilter: activeLength,
    },
    {
      title: "Obtížnost",
      options: DIFFICULTY_OPTIONS,
      key: "difficulty",
      activeFilter: activeDifficulty,
    },
  ];

  const [open, setOpen] = useState(!!hasActiveFilters);

  const toggleTransport = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get("transport")?.split(",").filter(Boolean) ?? [];
    const next = current.includes(type) ? current.filter((t) => t !== type) : [...current, type];
    if (next.length === 0) {
      params.delete("transport");
    } else {
      params.set("transport", next.join(","));
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const toggleSingleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const clearParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  function clearFilters() {
    router.replace("?", { scroll: false });
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-end justify-end">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 font-medium text-gray-700 text-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
          aria-expanded={open}
          data-testid="filter-button"
        >
          <FaFilter
            className={`h-3 w-3 text-gray-400 transition-transform duration-200`}
            aria-hidden
          />
          Filtrovat trasy
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-amber-600 px-1.5 py-0.5 text-white text-xs">
              {
                [
                  activeTransport.length > 0,
                  !!activeTrailType,
                  !!activeLength,
                  !!activeDifficulty,
                ].filter(Boolean).length
              }
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="mt-4 flex flex-wrap items-end gap-6" data-testid="filter-wrapper">
          {filters.map(({ title, options, activeFilter, key }) => (
            <div key={title} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
                  {title}
                </span>
                {activeFilter.length > 0 && (
                  <button
                    type="button"
                    onClick={() => clearParam(key)}
                    className="text-gray-600 text-xs underline-offset-2 transition-colors hover:text-gray-700 hover:underline"
                    data-testid={`btn-clear-${key}`}
                  >
                    Zrušit
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {options.map(
                  ({
                    value,
                    label,
                    Icon,
                  }: {
                    value: string;
                    label: string;
                    Icon?: React.ElementType;
                  }) => (
                    <FilterPill
                      key={value}
                      active={
                        key === "length" ? activeFilter === value : activeFilter.includes(value)
                      }
                      onClick={() =>
                        key === "transport" ? toggleTransport(value) : toggleSingleParam(key, value)
                      }
                      dataTestId={`btn-${key}-${value}`}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
                      {label}
                    </FilterPill>
                  ),
                )}
              </div>
            </div>
          ))}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="cursor-pointer self-end pb-1.5 text-gray-700 text-sm underline-offset-2 transition-colors hover:text-gray-700 hover:underline"
            >
              Zrušit vše
            </button>
          )}
        </div>
      )}
    </div>
  );
}
