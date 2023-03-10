import { useReducer, useRef } from "react";
import "./App.css";
import DetailCard from "./components/DetailCard";
import EmptyCard from "./components/EmptyCard";
import History from "./components/History";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { type } from "@testing-library/user-event/dist/type";
 


const initialState = {
  search: "",
  searchHistory: [],
};

//creo una instancia del cliente como variable de nombre queryclient
const queryClient = new QueryClient()
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH":
      return { ...state, search: action.payload };
    case "ADD_USER_TO_HISTORY":
      return {
        ...state,
        searchHistory: [...state.searchHistory, state.search],
      };
    default:
      return state;
  }
};
function App() {

 const [state, dispatch] = useReducer(reducer, initialState)
  return (
   <QueryClientProvider client={queryClient}>
    <div className="container">
      <header>
        <h1>Devfinder</h1>
        {/*para actualizar el historial cuando se da submit*/}
        <form onSubmit={(event)=>{
          event.preventDefault()
      
          dispatch({type: "ADD_USER_TO_HISTORY"} )
          //para limpiar el imput:
          dispatch({type: "UPDATE_SEARCH",
          payload: ""})
          
        }}>
          <label htmlFor="search">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search Github username_"
              autoComplete="off"
              //se agrega el valor para que sea lo que ingresamos:
              value={state.search}
              //se agrega la funcion dispatch para cuando escriben en el input
              onChange={(event) => {
                  dispatch({
                    type: "UPDATE_SEARCH",
                    payload: event.target.value,
                  });
                }}
            />
            <button type="submit">Search</button>
          </label>
        </form>
      </header>
      <div className="result">
      {
        state.searchHistory.length===0 ? <EmptyCard text="Prueba buscando un usuario de gitHub como dolores91"/> : (
        //uso el [] para indicar la ultima posición buscada! -1 xq arranca de 0
        <DetailCard user={state.searchHistory[state.searchHistory.length-1]}/>)
      }
      </div>
      <History />
    </div>
    </QueryClientProvider>
  );
}

export default App;
