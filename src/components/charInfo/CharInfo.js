import "./charInfo.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    // Хук життєвого цикла стану, який каже що компонент відрендерився
    this.updateChar(); // запскається функція
  }

  componentDidUpdate(prevProps, PrevState) {
    // цей хук спрацьовує  коли змінюється стан або пропс. Арументи превПропс і превСтейт означає, що хук приймає в себе також попередні результати, щоб мати можливість порівнювати що було і що стало
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelService
      .getCharacter(charId) // коли ми отримаємо відповідь від сервіса (в даному випадку один персонаж)
      .then(this.onCharLoaded) // він потрапить в onCharLoaded і запишеться в якості аргументу (char), який зазначений в самому методі
      .catch(this.onError); // відловлюємо можливі помилки, якщо вони будуть.
  };

  onCharLoaded = (char) => {
    // і тут зміниться состояние char
    this.setState({
      char,
      loading: false,
    });
  };

  onCharLoading = () => {
    this.setState({
      // setState - після себе завжди автоматично запускає команду рендер!
      loading: true,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
