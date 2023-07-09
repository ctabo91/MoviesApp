let currentId = 0;

let movieList = [];

$(function(){
    $('#new-movie-form').on('submit', function(e){
        e.preventDefault();
        let title = $('#title').val();
        let rating = $('#rating').val();

        let movieData = {title, rating, currentId};
        const movieDataHTML = createMovieDataHTML(movieData);

        currentId++
        movieList.push(movieData);

        $('#movie-table-body').append(movieDataHTML);
        $('#new-movie-form').trigger('reset');
    });

    $('tbody').on('click', '.btn.delete-btn', function(e){
        let removeIdx = movieList.findIndex((movie) => movie.currentId === +$(e.target).data('deleteId'))

        movieList.splice(removeIdx, 1)

        $(e.target).closest('tr').remove();
    });

    $('.fas').on('click', function(e){
        let direction = $(e.target).hasClass('fa-sort-down') ? 'down' : 'up';
        let sortKey = $(e.target).attr('id');
        let sortedMovies = sortBy(movieList, sortKey, direction);

        $('#movie-table-body').empty();

        for(let movie of sortedMovies){
            const movieDataHTML = createMovieDataHTML(movie);
            $('#movie-table-body').append(movieDataHTML);
        }

        $(e.target).toggleClass('fa-sort-down');
        $(e.target).toggleClass('fa-sort-up');
    });
});

function sortBy(arr, sortKey, direction){
    return arr.sort(function(a, b){
        if(sortKey === 'rating'){
            a[sortKey] = +a[sortKey];
            b[sortKey] = +b[sortKey];
        }
        if(a[sortKey] > b[sortKey]){
            return direction === 'up' ? 1 : -1;
        }
        else if(b[sortKey] > a[sortKey]){
            return direction === 'up' ? -1 : 1;
        }
        return 0;
    });
}

function createMovieDataHTML(data){
    return `
        <tr>
            <td>${data.title}</td>
            <td>${data.rating}</td>
            <td>
                <button class="btn delete-btn" data-delete-id=${data.currentId}>Delete</button>
            </td>
        </tr>
    `;
}