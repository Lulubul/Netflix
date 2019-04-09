import React, { Component } from 'react';
import './Movies.css';
import Dropdown from './shared/Dropdown';
import { MoviesAsync } from '../resources/Api';
import { Container } from './shared/Container';
import { MOVIES_PAGE_LOADED } from '../constants/actionTypes';
import { connect } from "react-redux";

const mapStateToProps = state => ({ ...state.movies });
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: MOVIES_PAGE_LOADED, payload })
});

class Movies extends Component {

  componentWillMount() {
    let genresPromise = MoviesAsync.getGenres().then(response => response || []);
    let moviesPromise = MoviesAsync.getMovies().then(response => response || []);
    this.props.onLoad(Promise.all([genresPromise, moviesPromise]).then(([genres, movies]) => ({genres, movies})));
  }

  render() {
    const netflixOriginals = [
      { image: 'https://occ-0-3032-768.1.nflxso.net/dnm/api/v5/rendition/8235889aa78c638456a837ba52c96294bfd5070d/AAAABVMta4Fjh88G4OFYOKqY7dQjOKq2Aj4MGtFihhQaQKpfTCJ6BaLPH35JrZr_7pNHJVyKO1BjJLBqJzSBwBu7JtlqewoLhG2RHmMmnwq5x8Lx2HAE6mW0sqB6OMC9HX8oT8ziRrqs-KsOAZCqGTm446MVprFK5a241WggIGUf80_l4rDJSpPZ-cD-eHJqP6bSqNM3lGVtCQEGj_oVrpR42TG80nkyO0dTFnfg8nnQirC9Np7gOg-FwuZLKzM23bz1LtnWmX5s83YJzYf9bQ.webp' },
      { image: 'https://occ-0-3032-768.1.nflxso.net/dnm/api/v5/rendition/8235889aa78c638456a837ba52c96294bfd5070d/AAAABXXMR156Hg0LTwBZbdYEpfFzV9DsS14wgrQFCZDa8ohmTWNBg9hk2TBUW8BAkRTOG8BWC_bPaRyMSt1lpYSp0XxdTqPB0X5PK6yZwSpBVYJZZ37oNrNCYhXm2hENCf5gIQ0FYUGkvjOELOqVjs-clHMyay1xvlrmDPt_mYCK7Z0JigMNavAuuHBQ10fZZoVud2zooCchN85_Q-QbHVcslnOwYaE8j66dRtln89TD8G-f41UPHSnvgl6JAiH2jEc5lI3kRSuwNgcoTYc21g.webp' },
      { image: 'https://occ-0-3032-768.1.nflxso.net/dnm/api/v5/rendition/8235889aa78c638456a837ba52c96294bfd5070d/AAAABU5iU4_TjmTlYdSIyGzl3-1M17HKWGdWe6PKVrClf-DezQDNAmksaDm5F67yUoIcXQzy3BibjQcC8jRV4cpVt_7DR9JhcBU9NufWFdOgiWX7-qrSO-cCoVBLrCdoCAO36Yt8VdCv3zyg7pV6UT0775oB_Co8NEK6QhROTSxfaBNdEPSk7QEhtirn_57jAgLHBFHtjKRgeLfOuB62fuw_DAzM5sjA7jl7HbiQH1n3Gr0fUnScedTknk7jlG0oI-vGBN6FPBXdbmX76nhZgg.webp' },
      { image: 'https://occ-0-3032-768.1.nflxso.net/dnm/api/v5/rendition/8235889aa78c638456a837ba52c96294bfd5070d/AAAABYuRQJDvbcfKyM3lCUKoZb3CnTKIlRktbf9J_87XB9jxtmywOkQYBpPS8dvjtfLPrhGz2vGKmtkhX1_z4UtTDqmt0hey5bRyEV1C7SOZHxz3Qd_VdtqAcchELHedbkRYR2xmDsu3l4gYpU2FjisPtTCuKmvqhuE7Uykf50AmSmXpDkdDXhuKtNrcyDoKjFbkBguqucmFlEBCNXaCDkN3By1dYaSOaCDMUj-e-HxbY0s6lSim4mJxh6v6ASKKna0H8YVT21BKPLGHtkabfw.webp' },
      { image: 'https://occ-0-3032-768.1.nflxso.net/dnm/api/v5/rendition/8235889aa78c638456a837ba52c96294bfd5070d/AAAABSaM9rO_DsASwj8LVbgd1WmAZNq-joiIVeDjdaDRY2qQyeRnE7LHsLfVhETAVZz1196lZUuxBf_1AMqqC5TC2Pa1eqJHIEX6zuCMriswa6MQ2AYbULrLVHfeZjLPZA37XDOHC8t1V-3B2A7tWhhbpcL2eZnEkUhjV52XSVagUU87TVv9SOItyf0trLHciooW1js-2jMzRlSRz4XLqTk9O04vRg9q2T4_nnnfjIVscj0x4Xd8aK2zPVvMAyD-n3FqUqg20wDsYVwpo7-mgw.webp' }
    ];
    const {movies, genres} = this.props;
    return (
      <div>
        <div id="genres">
          <p>Movies</p>
          <Dropdown options={genres}></Dropdown>
        </div>
        <Container title="Popular on Netflix" items={movies}></Container>
        <Container title="Netflix originals" items={netflixOriginals}></Container>
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);