import "./charList.scss";
import { Component } from "react";
import PropTypes from 'prop-types';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    // метод для обробки запитів від користувача (клік на кнопку для завантаження більше персонажів)
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({ offset, charList }) => ({
      // створюємо кол-бек функцію. В нас стейт залежить від попереднього стейта через довантаження нових персонажів.Це означає, що ми повертаємо обєкт з цієї функції
      charList: [...charList, ...newCharList], // беремо старий стейт чарліст s розгортаємо його, і додаємо новий масив НьюЧарЛіст
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  onRenderList = (arr) => {
    const elements = arr.map((item) => {
      const { id, name, thumbnail } = item;
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
      ) {
        imgStyle = { objectFit: "unset" };
      }
      return (
        <li
          className={`char__item`}
          key={id}
          onClick={() => this.props.onCharSelected(id)}
        >
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{elements}</ul>;
  };

  render() {
    const { charList, loading, error, offset, newItemLoading, charEnded } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    const items = this.onRenderList(charList);

    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ 'display': charEnded ? 'none' : 'block' }}
          onClick={() => this.onRequest(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

// const View = ({ charList }) => {
//   const elements = charList.map((item) => {
//     const { id, name, thumbnail } = item;
//     let imgStyle = { 'objectFit': 'cover' };
//     if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//       imgStyle = { 'objectFit': 'unset' };
//     }
//     return (
//       <li className={`char__item`} key={id} onClick={() => this.props.onCharSelected(id)}>
//         <img src={thumbnail} alt={name} style={imgStyle} />
//         <div className="char__name">{name}</div>
//       </li>
//     );
//   });
//   return <ul className="char__grid">{elements}</ul>;
// };

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}


export default CharList;
