import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Tooltip } from "../components/Tooltip";
import Reducer from "./Reducer";

const initialState = {
  elements: [],
};

export const Context = createContext(initialState);

const Store = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch] as any}>
      {children}
    </Context.Provider>
  );
};

export { Store };

export enum ElementType {
  ANIME,
  CHARACTER,
  TEXT,
  GIF,
  VIDEO,
  ANIME_COVER,
}

interface ElementComponentProps {
  element: Element;
}

export function ElementComponent({ element }: ElementComponentProps) {
  const [state, dispatch] = useContext(Context) as any;

  const elementType = element.type;
  return (
    <BaseElement
      removeElement={() =>
        dispatch({ type: "REMOVE_ELEMENT", payload: element })
      }
    >
      {elementType == ElementType.ANIME && (
        <IdBasedElementComponent labelText="Anime" element={element} />
      )}
      {elementType == ElementType.CHARACTER && (
        <IdBasedElementComponent labelText="Character" element={element} />
      )}
      {elementType == ElementType.TEXT && (
        <TextBasedElementComponent labelText="Text" element={element} />
      )}
      {elementType == ElementType.GIF && (
        <TextBasedElementComponent labelText="Gif URL" element={element} />
      )}
      {elementType == ElementType.VIDEO && (
        <TextBasedElementComponent labelText="Youtube URL" element={element} />
      )}
      {elementType == ElementType.ANIME_COVER && (
        <IdBasedElementComponent labelText="Anime Cover" element={element} />
      )}
    </BaseElement>
  );
}

interface IdBasedElementComponent {
  element: Element;
  labelText: string;
}
function IdBasedElementComponent({
  element,
  labelText,
}: IdBasedElementComponent) {
  const [id, setId] = useState<number>(element.properties.id || 0);
  useEffect(() => {
    element.properties.id = id;
  }, [id]);
  return (
    <div className="flex flex-col space-y-1">
      <label className="flex flex-row justify-between font-semibold text-gray-200">
        <span>{labelText} ID</span>
      </label>
      <input
        type="number"
        className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-xl focus:outline-none focus:ring-blue-500 focus:ring-opacity-70 ring ring-transparent"
        value={id}
        onChange={(e) => e.target.value && setId(parseInt(e.target.value))}
      />
    </div>
  );
}

interface TextBasedElementComponent {
  element: Element;
  labelText: string;
}
function TextBasedElementComponent({
  element,
  labelText,
}: TextBasedElementComponent) {
  const [text, setText] = useState<string>(element.properties.text || "");
  useEffect(() => {
    element.properties.text = text;
  }, [text]);
  return (
    <div className="flex flex-col space-y-1">
      <label className="flex flex-row justify-between font-semibold text-gray-200">
        <span>{labelText}</span>
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 text-gray-100 bg-gray-700 rounded-xl focus:outline-none focus:ring-blue-500 focus:ring-opacity-70 ring ring-transparent"
        value={text}
        onChange={(e) => setText(e.target.value || "")}
      />
    </div>
  );
}

export interface Element {
  id: number;
  type: ElementType;
  properties: any;
}

interface BaseElementProps {
  children: ReactNode;
  removeElement(): void;
}

function BaseElement({ removeElement, children }: BaseElementProps) {
  return (
    <div className="relative flex flex-col p-4 space-y-1 border border-gray-800 rounded-xl">
      <button
        onClick={removeElement}
        className="absolute top-0 right-0 p-1 bg-gray-700 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-100 transition-colors hover:text-red-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {children}
    </div>
  );
}
