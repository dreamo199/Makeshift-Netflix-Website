import { Search } from "lucide-react";
import { useState } from "react";


function Searchh(){

    const [query, setquery] = useState('');

    const handleSearch = async(e) => {
        const value = e.target.value;
        setQuery(value);
    
        if (value.trim() == ""){
          setResults([]);
          return;
        }
    
        const res = await fetch(`http://127.0.0.1:8000/api/search/movie/?search=${text}`);
        const data = await res.json();
        setResults(data);
        console.log(data)
      }
    
    return(
        <div className="search">
            <div>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-white/50" />

                <input 
                    type="text" 
                    placeholder="Search through millions of movies"
                    value={query}
                    onChange={handleSearch}
                />
            </div>
        </div>
    )
}
export default Searchh;