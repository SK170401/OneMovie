import { ComingSoon } from "@/components/GalleryList/GalleryList";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useEffect, useState } from "react";

const CategorySection = () => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl">Explore movies glimps that will soon hit the theaters.</h2>
            <p className="text-sm">Get the latest updates on upcoming movies, series. See some trailers, posters.</p>
        </div>
    );
};

const Movies = () => {
    const [pageCount, setPageCount] = useState(1)

    const PrevPage = () => {
        if (pageCount !== 1) {
            setPageCount(pageCount - 1)
            scrollToTop()
        }
    }
    const NextPage = () => {
        if (pageCount >= 1) {
            setPageCount(pageCount + 1)
            scrollToTop()
        }
    }

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <section className="m-auto max-w-[1536px] min-h-screen flex flex-col justify- gap-5 px-5">
            <div className="grid lg:grid-cols-2 justify-between">
                <CategorySection />
            </div>
            <div className="">
                <ComingSoon column={null} link={null} page={pageCount} />
            </div>
            <div className="justify-self-center">
                {isVisible &&
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious className="cursor-pointer" onClick={PrevPage} />
                            </PaginationItem>
                            {pageCount == 1 ? null :
                                <PaginationItem>
                                    <PaginationLink className="cursor-pointer" onClick={() => { setPageCount(1); scrollToTop() }} >1</PaginationLink>
                                </PaginationItem>
                            }
                            <PaginationItem>
                                <PaginationLink className="cursor-pointer" >{pageCount}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext className="cursor-pointer" onClick={NextPage} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                }
            </div>
        </section>
    );
};

export default Movies;
