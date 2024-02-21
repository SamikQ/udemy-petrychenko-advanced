import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
  state = {
    charList: [],
  };
  
  marvelService = new MarvelService();

  componentDidMount() {
    console.log("mount");
    this.updateCharList();
  }

  onCharListLoaded = (charList) => {
    this.setState({
      charList,
    });
  };

  updateCharList = () => {
    console.log("update");
    this.marvelService
    .getAllCharacters()
    .then(this.onCharListLoaded);
  };

  render() {
    console.log("render");
    const { charList } = this.state;
    console.log(charList);
    return (
      <div className="char__list">
        <View charList={charList} />
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const View = ({ charList }) => {
  const elements = charList.map((item) => {
    const { name, thumbnail } = item;
    return (
      <li className="char__item">
        <img src={thumbnail} alt="abyss" />
        <div className="char__name">{name}</div>
      </li>
    );
  });
  return <ul className="char__grid">{elements}</ul>;
};

export default CharList;
