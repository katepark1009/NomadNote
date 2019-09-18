import React from "react";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";

const TitleInput = styled(TextareaAutosize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  &::placeholder {
    font-weight: 600;
  }
`;

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  margin-top: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button`
-webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  width: 100px;
  height: 50px;
  cursor: pointer;
  margin: 0 auto;
  border: 2px solid rgb(139,131,134);
  -webkit-border-radius: 40px;
  border-radius: 40px;
  font: normal 27px/50px "Advent Pro", Helvetica, sans-serif;
  color: rgb(139,131,134);
  text-align: center;
  -o-text-overflow: clip;
  text-overflow: clip;
  letter-spacing: 1px;
  background: rgba(0,0,0,0);
  &:hover {
    color: rgba(255,255,255,1);
    background: rgb(139,131,134);
  }
  &:active {
    border: 2px solid rgba(139,131,134,1);
    background: rgba(139,131,134,1);
    -webkit-transition: none;
    -moz-transition: none;
    -o-transition: none;
    transition: none;
  }
`;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "",
      content: props.content || "",
      id: props.id || null
    };
  }
  render() {
    const { title, content } = this.state;
    return (
      <>
        <TitleContainer>
          <TitleInput
            value={title}
            onChange={this._onInputChange}
            placeholder={"Untitled..."}
            name={"title"}
          />
          <Button onClick={this._onSave}>Save</Button>
        </TitleContainer>
        <ContentPreview>
          <ContentInput
            value={content}
            onChange={this._onInputChange}
            placeholder={"# This supports markdown!"}
            name={"content"}
          />
          <MarkdownRenderer markdown={content} className={"markdown"} />
        </ContentPreview>
      </>
    );
  }
  _onInputChange = event => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    });
  };
  _onSave = () => {
    const { onSave } = this.props;
    const { title, content, id } = this.state;
    onSave(title, content, id);
  };
}
