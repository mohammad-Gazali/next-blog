import { ChangeEvent, Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Tag } from "@prisma/client";



interface TagsComboboxProps {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
}

const TagsCombobox: FC<TagsComboboxProps> = ({ tags, selectedTags, setSelectedTags }) => {

  const [filteredTags, setFilteredTags] = useState<Tag[]>(tags);
  const [query, setQuery] = useState("");


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setFilteredTags(tags.filter(tag => tag.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <div className="w-72">
      {/* @ts-ignore */}
      <Combobox value={selectedTags} onChange={setSelectedTags} multiple>
        <div className="relative">
          <Combobox.Input
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="choose tags..."
            value={query}
            onChange={handleChange}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pe-2">
            <ChevronsUpDown
              className="h-5 w-5 text-muted-foreground"
              aria-hidden="true"
            />
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => {
              setQuery("");
              setFilteredTags(tags);
            }}
          >
            <Combobox.Options className="absolute w-full max-h-44 mt-1 overflow-auto rounded-md border bg-background py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm custom-scrollbar">
                  {filteredTags.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-muted-foreground">
                      Nothing found.
                    </div>
                  ) : (
                    filteredTags.map(tag => (
                      <Combobox.Option
                        key={tag.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-secondary text-secondary-foreground" : "text-foreground"
                          }`
                        }
                        value={tag.id}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {tag.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-secondary-foreground" : "text-accent-foreground"
                                }`}
                              >
                                <Check className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
              
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}


export default TagsCombobox;