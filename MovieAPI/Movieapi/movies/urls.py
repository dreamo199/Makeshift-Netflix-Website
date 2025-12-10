from django.urls import path
from .views import (
    MovieList, MovieDetails, PopularMovies, TopRatedMovies,
    RandomFeaturedMovie, UpcomingMovies, SearchMovies, GenreList, MoviesByGenre, similar_movies
)

urlpatterns = [

    # Movie endpoints
    path('movies/', MovieList.as_view()),
    path('movies/<int:pk>/', MovieDetails.as_view()),

    # categories
    path('movies/popular/', PopularMovies.as_view()),
    path('movies/top_rated/', TopRatedMovies.as_view()),
    path('movies/featured/', RandomFeaturedMovie.as_view()),
    path('movies/upcoming/', UpcomingMovies.as_view()),

    # Search
    path('search/movie/', SearchMovies.as_view()),

    # Genres
    path('genres/', GenreList.as_view()),
    path('genres/<int:genre_id>/movies/', MoviesByGenre.as_view()),

    #Similar Movies
    path('movies/<int:pk>/similar/', similar_movies, name='simlar-movies'),
]
