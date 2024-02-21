import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
  state = {
    charList: [],
    loading: true, 
    error: false
  };
  
  marvelService = new MarvelService();

  componentDidMount() {
    console.log("mount");
    this.updateCharList();
  }

  onCharListLoaded = (charList) => {
    this.setState({
      charList,
      loading: false
    });
  };

  updateCharList = () => {
    console.log("update");
    this.marvelService
    .getAllCharacters()
    .then(this.onCharListLoaded)
    .catch(this.onError);
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    console.log("render");
    const { charList } = this.state;
    console.log(charList);
    return (
      <div className="char__list">
        <View charList={charList}/>
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
    return (
      <li className={`char__item ${clazz}`} id={id}>
        <img src={thumbnail} alt={name} />
        <div className="char__name">{name}</div>
      </li>
    );
  });
  return <ul className="char__grid">{elements}</ul>;
};

export default CharList;
