import React from "react"
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api"

export default function Vans() {
    const [vans, setVans] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const typeFilter = searchParams.get("type");
    //console.log(typeFilter)

    // React.useEffect(() => {
    //     fetch("/api/vans")
    //         .then(res => res.json())
    //         .then(data => setVans(data.vans))
    // }, [])

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)

            } catch (err) {
                //console.log("There was an error!")
                //console.log(err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
    }, [])

    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans;

    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link
                to={van.id}
                state={{
                    search: `?${searchParams.toString()}`,
                    type: typeFilter
                }}
                aria-label={`View details for ${van.name}, 
                             priced at $${van.price} per day`}>
                <img src={van.imageUrl} alt={`Image of ${van.name}`} />
                <div className="van-info">
                    <h2>{van.name}</h2>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))


    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    if (loading) {
        return <h1 aria-live="polite">Loading...</h1>
    }
    
    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>
    }

    /*
     <Link to="?type=simple" className="van-type simple">Simple</Link>
     <Link to="?type=rugged" className="van-type rugged">Rugged</Link>
     <Link to="?type=luxury" className="van-type luxury">Luxury</Link>
     <Link to="." className="van-type clear-filters">Clear</Link>
    */
    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange("type", "simple")}
                    className={
                        `van-type simple ${typeFilter === "simple" ? "selected" : ""}`
                    }
                >Simple</button>
                <button
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={
                        `van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`
                    }
                >Luxury</button>
                <button
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={
                        `van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`
                    }
                >Rugged</button>
                {typeFilter && <button onClick={() => { setSearchParams({}) }} className="van-type clear-filters">Clear</button>}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div >
    )
}