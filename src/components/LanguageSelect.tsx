import React, { useState, useEffect, useRef } from "react";
import useOnClickOutside from "@/components/ClickOutsideHook";

const AutoCompleteSearch = (data: string[]) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [inFocus, setInFocus] = useState<boolean>();
  const inputSelectRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredData(
      data.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, data]);

  useOnClickOutside([inputSelectRef, optionsRef], () => {
    setInFocus(false);
  });
  const handleFocus = () => {
    setInFocus(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        className="mx-auto flex w-min rounded-xl border-zinc-300 bg-orange-100 py-2 pl-4 text-purple-700 dark:bg-zinc-900 dark:text-zinc-100"
        onChange={(e) => setSearch(e.target.value)}
        ref={inputSelectRef}
        onFocus={handleFocus}
      />
      {search && (
        <div
          ref={optionsRef}
          className={`-mt-4 flex justify-center ${inFocus ? "" : "hidden"}`}
        >
          <ul className="flex max-h-32 w-min flex-col overflow-y-scroll rounded-b-xl bg-orange-100 py-2 pl-4 pt-2 pr-12 text-purple-700 dark:bg-zinc-900 dark:text-zinc-100">
            {filteredData.map((item, index) => (
              <li
                className="pl-4 pr-12 text-white"
                key={index}
                onClick={() => {
                  setSearch(item);
                  setInFocus(false);
                }}
              >
                <div className="pr-12">{item}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoCompleteSearch;
