import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharListLoaded = (charList) => {
    this.setState({
      charList,
      loading: false
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { charList, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View charList={charList} /> : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const View = ({ charList }) => {
  const clazz = "char__item_selected";
  const elements = charList.map((item) => {
    const { id, name, thumbnail } = item;
    let imgStyle = { 'objectFit': 'cover' };
    if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
      imgStyle = { 'objectFit': 'unset' };
    }
    return (
      <li className={`char__item ${clazz}`} key={id} >
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div className="char__name">{name}</div>
      </li>
    );
  });
  return <ul className="char__grid">{elements}</ul>;
};

export default CharList;
