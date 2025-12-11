import { Search } from "lucide-react";

function Searchh({ onSearch }){
    return(
        <div className="search">
            <div>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-white/50" />

                <input 
                    type="text" 
                    placeholder="Search through millions of movies"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </div>
    )
}
export default Searchh;