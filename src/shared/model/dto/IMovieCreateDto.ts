export interface IMovieCreateDto {
    movieId?: string;
    movieName: string;
    movieDirector: string;
    movieLength: number;
    movieTrailerUrl: string;
    moviePoster: string;
    movieDescription: string;
    movieCategoryIds: number[];
    movieActorIds: number[];
}
