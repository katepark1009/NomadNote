import React from 'react';
import {Query} from 'react-apollo';
import { GET_NOTE } from '../../queries'
import styled from 'styled-components'
import MarkdownRenderer from "react-markdown-renderer";
import { Link } from "react-router-dom";

const TitleComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
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

export default class Note extends React.Component {
    render () {
        console.log(this.props)
        const {
            match : {
                params: { id }
            }
        } = this.props;
        return (
          <Query query={GET_NOTE} variables={{id}}>
          {({data}) =>
            data.note ? (
            <>
              <TitleComponent>
                <Title>{data.note && data.note.title}</Title>
                <Link to={`/edit/${data.note.id}`}>
                  <Button>Edit</Button>
                </Link>
              </TitleComponent>
              <MarkdownRenderer markdown={data.note.content} />
            </>
          ) : null

          }
          </Query>
        )
    }
}
