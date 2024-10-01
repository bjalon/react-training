/* eslint-disable */
import {useRef, useState} from "react";
import Constants from "../tools/Constants.ts";
import SearchResultItem from "./sub/SearchResultItem.tsx";

interface SearchData {
    searchResult: any[];
}

interface SearchComponentProps {
    onAddFavoris: (favoris: any) => void;
}

export default function SearchComponent(props: SearchComponentProps) {
    const [data, updateData] = useState<SearchData>({searchResult: []})
    const currentTypedData = useRef(null)

    const getData = async (searchCriteria: string) => {
        const url = `${Constants.imdbBaseUrl}&s=${encodeURIComponent(searchCriteria)}`
        const response = await fetch(url);
        const myData = {...data}
        const jsonResponse = await response.json();
        myData.searchResult = jsonResponse.Search;

        updateData(myData)
    }

    const doSearch = () => {
        const current = currentTypedData.current;
        if (current) {
            getData(current.value)
        }
    }

    return <div className="col-4">
        <div className="row">
            <div className="col-10">
                <input
                    ref={currentTypedData}
                    type="text"
                    className="form-control"
                    placeholder="Nom de la série"
                />
            </div>
            <div className="col-2">
                <button className="btn btn-success" onClick={doSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Séries</th>
                <th>Année</th>
                <th>Image</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {data.searchResult.map(item => <SearchResultItem info={item} onClick={props.onAddFavoris}/>)}
            </tbody>
        </table>
    </div>;
}