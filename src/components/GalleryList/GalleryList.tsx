import { getMovie, getSeries, search, searchByPlatform } from "@/api/client"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import GallerySkeleton from "./GallerySkeleton"
import { Button } from "@/components/ui/button"
import Gallery from "./Gallery"

// Gallery Section Home
export const GalleryMovies = ({ type, colmn }) => {
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const data = (await getMovie())
            setData(data)
        })()

        setTimeout(() => {
            setisLoading(false)
        }, 300);
    }, [])

    return (

        <>
            {
                isLoading && <GallerySkeleton items={colmn} />
            }
            {!isLoading && data &&

                <div className="grid gap-10 border-t pt-10">
                    <div className="flex gap-3 justify-between">
                        <h2 className="font-semibold text-2xl">{type == "TV Series" ? "Series" : "Movies"}</h2>
                        <Link to={"/movies"}>
                            <Button>See More</Button>
                        </Link>
                    </div>
                    <div>
                        {
                            <Gallery data={data} items={colmn} />
                        }
                    </div>
                </div>
            }
        </>
    )
}


// Gallery Section Series
export const GallerySeries = ({ type, colmn }) => {
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const data = (await getSeries())
            setData(data)
        })()

        setTimeout(() => {
            setisLoading(false)
        }, 300);
    }, [])

    return (

        <>
            {
                isLoading && <GallerySkeleton items={colmn} />
            }
            {!isLoading && data &&

                <div className="grid gap-10 border-t pt-10">
                    <div className="flex gap-3 justify-between">
                        <h2 className="font-semibold text-2xl">{type == "TV Series" ? "Series" : "Movies"}</h2>
                        <Link to={"/series"}>
                            <Button>See More</Button>
                        </Link>

                    </div>
                    <div>
                        {
                            <Gallery data={data} items={colmn} />
                        }
                    </div>
                </div>
            }
        </>
    )
}


export const GalleryListSearch = ({ param }) => {
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        (async () => {
            const data = (await search(param))
            setData(data)
        })()
        setTimeout(() => {
            setisLoading(false)
        }, 100);
    }, [param])

    return (
        <>
            {
                isLoading && <GallerySkeleton items={null} />
            }
            {!isLoading && data &&
                <div className="grid gap-10 flex-wrap justify-center border-t pt-10">
                    {
                        data[0] ?
                            <div>
                                <Gallery data={data} items={null} />
                            </div>
                            : <div className="flex justify-center items-center w-full">
                                <h2 className="text-4xl font-bold w-full">No Result Found</h2>
                            </div>
                    }
                </div>
            }
        </>
    )
}

export const GalleryListPlatform = () => {
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const { platform } = useParams()

    useEffect(() => {
        (async () => {
            const platformRes = await searchByPlatform(platform)
            setData(platformRes)
        })()
        setTimeout(() => {
            setisLoading(false)
        }, 300);
    }, [platform])

    return (
        <>
            <section className="m-auto max-w-[1536px] grid gap-5 px-5 my-20">
                <div>
                    <h2 className="font-semibold text-lg">Platform : <span className="text-red-500">{platform}</span></h2>
                </div>
                {
                    isLoading && <GallerySkeleton items={null} />
                }
                {!isLoading && data &&
                    <div className="grid gap-10 flex-wrap justify-center border-t pt-10">
                        <Gallery data={data} items={null} />
                    </div>
                }
            </section>
        </>
    )
}