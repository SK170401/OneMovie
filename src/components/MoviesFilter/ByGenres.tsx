import { getAllGenres } from "@/api/client"
import { useCallback, useEffect, useState } from "react"
import MoviesByGenresSkeleton from "./SkeletonMoviesByGenres"
import { Link } from "react-router-dom"
import MoviesByGenre from "./FetchGenres"
import { Card, CardContent } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

const ByGenres = () => {
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(true)

    const fetchData = useCallback(async () => {
        const data = await getAllGenres();
        setData(data);

    }, []);

    // console.log(movie)

    useEffect(() => {
        fetchData();
        setTimeout(() => {
            setisLoading(false)
        }, 100);
    }, [fetchData]);

    return (
        <section>
            <div className="flex gap-3 flex-wrap justify-center">
                {
                    isLoading && <MoviesByGenresSkeleton />
                }

                {
                    !isLoading && data &&
                    <div className="w-full grid gap-5">
                        <h2 className="font-semibold text-2xl">Category</h2>
                        <div className="lg:px-5">
                            <Carousel orientation="horizontal" className="gri rid-cols-5 gap- justify-center w-full"
                                opts={{
                                    align: "start",
                                    // loop: true,

                                }}
                            // plugins={[
                            //     Autoplay({
                            //         delay: 5000,
                            //     }),

                            // ]}
                            >
                                <CarouselContent className="w-64" >
                                    {
                                        data.map((genre, idx) => {
                                            return <CarouselItem key={idx} >
                                                <Link to={`/category/${genre}`}>
                                                    <Card className="rounded-md border overflow-hidden select-none">
                                                        <CardContent className="overflow-hidde p-1">
                                                            <div className="h-[350px] w-full relative">
                                                                <MoviesByGenre genre={genre}></MoviesByGenre>
                                                                <div className="w-full h-full bg-red-20 rounded-md absolute top-0 bottom-0 bg-gradient-to-t from-black from-5% to-50% to-transparent" />
                                                                <h2 className="capitalize absolute bottom-0 px-5 pb-1 text-center w-full">{genre}</h2>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            </CarouselItem>
                                        })
                                    }
                                </CarouselContent>
                                <CarouselPrevious className="hidden lg:flex" />
                                <CarouselNext className="hidden lg:flex" />
                            </Carousel>
                        </div>
                    </div>
                }
            </div>
        </section >
    )
}

export default ByGenres

// <Button className = "capitalize rounded-full" >
//     <Link to={"#"}>
//         {moviegenre}
//     </Link>
//  </Button >