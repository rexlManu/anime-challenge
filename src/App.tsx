import { ReactNode, useContext, useState } from "react";
import { generateCode, SELECT_MEDIAS } from "./api/anilist";
import challenges from "./challenges.json";
import {
  Context,
  Element,
  ElementComponent,
  ElementType,
  Store,
} from "./element/Element";

function App() {
  const [code, setCode] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState("01");
  const [state, dispatch] = useContext(Context) as any;

  const createCode = () => {
    const challenge = (challenges as any)[selectedChallenge];
    generateCode(
      state.elements || [],
      `Day ${selectedChallenge}:<br/> ${challenge}`
    ).then((code) => setCode(code));
  };
  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container h-screen p-4 mx-auto">
        <div className="flex flex-col h-full">
          <div className="flex flex-row my-4">
            <div className="w-full p-4 bg-gray-800 rounded-xl">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col w-1/2 space-y-1">
                  <label className="font-medium text-gray-200">Challenge</label>
                  <div className="relative flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute w-6 h-6 ml-2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                      />
                    </svg>
                    <select
                      value={selectedChallenge}
                      className="w-full px-4 py-2 pl-8 bg-gray-100 rounded"
                      onChange={(e) => setSelectedChallenge(e.target.value)}
                    >
                      {Object.keys(challenges)
                        .sort((a, b) => parseInt(a) - parseInt(b))
                        .map((challengeKey) => {
                          const challenge = (challenges as any)[challengeKey];
                          return (
                            <option value={challengeKey} key={challengeKey}>
                              Day {challengeKey}: {challenge}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    onClick={createCode}
                    className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row flex-1 space-x-6 overflow-hidden">
            <div className="flex-1 w-1/2 p-6 bg-gray-800 rounded-2xl">
              <div className="flex flex-row justify-between mt-4 mb-10">
                <h2 className="text-4xl font-bold text-gray-100">
                  Generated Code
                </h2>
                <button
                  onClick={copyCode}
                  className="px-4 py-1 text-gray-100 transition bg-gray-900 rounded-lg hover:bg-gray-700"
                >
                  Copy Code
                </button>
              </div>
              <code className="text-sm text-gray-400 overflow-clip">
                {code}
              </code>
            </div>
            <div className="flex flex-col flex-1 w-1/2 p-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-800 scrollbar-thumb-rounded">
              <div className="flex flex-col space-y-4">
                <div className="px-4 py-8 border border-gray-800 border-dashed rounded-xl">
                  <div className="relative flex flex-col justify-center">
                    <button className="px-4 py-2 text-gray-100 bg-gray-800 peer rounded-xl">
                      Add Element
                    </button>
                    <div className="absolute z-50 hidden w-full peer-focus:block hover:block top-12">
                      <div className="flex flex-col w-full py-4 bg-gray-800 rounded-xl">
                        <ElementButton
                          text="Add Character"
                          type={ElementType.CHARACTER}
                        />
                        <ElementButton
                          text="Add Anime"
                          type={ElementType.ANIME}
                        />
                        <ElementButton
                          text="Add Text"
                          type={ElementType.TEXT}
                        />
                        <ElementButton text="Add Gif" type={ElementType.GIF} />
                        <ElementButton
                          text="Add Video"
                          type={ElementType.VIDEO}
                        />
                        <ElementButton
                          text="Add Anime Cover"
                          type={ElementType.ANIME_COVER}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Elements />
              </div>
            </div>
          </div>
          <div className="grid py-4 mt-8 border-t border-gray-800 place-items-center">
            <a
              href="https://github.com/rexlManu/anime-challenge"
              target="_blank"
              className="text-gray-300 hover:underline"
            >
              Star this project on github.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Elements() {
  const [state, dispatch] = useContext(Context) as any;

  return state.elements.map((element: Element, index: number) => {
    return <ElementComponent key={element.id} element={element} />;
  });
}

function ElementButton(props: any) {
  const [state, dispatch] = useContext(Context) as any;

  return (
    <Store>
      <button
        className="px-4 py-2 font-semibold text-left text-gray-200 transition-colors hover:bg-gray-700"
        onClick={() => {
          dispatch({
            type: "ADD_ELEMENT",
            payload: {
              id: Math.random(),
              type: props.type as ElementType,
              properties: {},
            },
          });
        }}
        {...props}
      >
        {props.text}
      </button>
    </Store>
  );
}

export default App;
