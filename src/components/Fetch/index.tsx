/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useState } from "react";
import "whatwg-fetch";

const initialState: ResponseData = {
  error: null,
  greeting: null,
};

type ResponseData = { error: any; greeting: string | null };

type ActionType =
  | {
      type: "SUCCESS";
      greeting: string;
    }
  | {
      type: "ERROR";
      error: any;
    };

function greetingReducer(state: ResponseData, action: ActionType) {
  switch (action.type) {
    case "SUCCESS": {
      return {
        error: null,
        greeting: action.greeting,
      };
    }
    case "ERROR": {
      return {
        error: action.error,
        greeting: null,
      };
    }
    default: {
      return state;
    }
  }
}

export default function Fetch({ url }: { url: string }) {
  const [{ error, greeting }, dispatch] = useReducer(
    greetingReducer,
    initialState
  );

  const [buttonClicked, setButtonClicked] = useState(false);

  async function fetchGreeting(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error in fetch datas");
      }
      const result = (await response.json()) as unknown as { greeting: string };
      //console.log(result);
      //console.log(typeof result);
      dispatch({ type: "SUCCESS", greeting: result.greeting });
      setButtonClicked(true);
    } catch (error) {
      dispatch({ type: "ERROR", error: error });
    }
  }

  const buttonText = buttonClicked ? "Ok" : "Carregar Saudação";

  return (
    <div>
      <button
        type="button"
        onClick={() => fetchGreeting(url)}
        disabled={buttonClicked}
      >
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role="alert">Oops, falha para buscar! {error?.message}</p>}
    </div>
  );
}
