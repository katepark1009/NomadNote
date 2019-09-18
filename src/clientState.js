import { NOTE_FRAGMENT } from './fragments';
import { GET_NOTES } from './queries';
import { saveNotes, restoreNotes } from "./offline";

export const defaults = {
    notes: restoreNotes() //!처음으로 호출되는 것.
};
export const resolvers = {
    Query: {
        note: (_, variables, { cache }) => {
            // console.log(variables);
            // return null; //! resolver는 무조건 null이라도 return해야함
            const id = cache.config.dataIdFromObject({ //! dataIdFromObject = A function that takes a data object and returns a unique identifier to be used when normalizing the data in the store.
                __typename:"Note",
                id: variables.id //!id를 이용해서 fragment를 가져오는 방법, array에서 찾는거랑은 다름
            });
            const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id });
            return note;
        }
    },
    Mutation : {
        createNote: (_, variables, { cache }) => {
            const { notes } = cache.readQuery({ query : GET_NOTES })
            console.log(notes);
            const { title, content } = variables;
            const newNote = {
                __typename: "Note",
                title,
                content,
                id : notes.length +1
            }
            cache.writeData({
                data: {
                    notes: [newNote, ...notes]
                }
            });
            saveNotes(cache);
            return newNote;
        },
        editNote: (_, { id, title, content }, { cache }) => {
          const noteId = cache.config.dataIdFromObject({
            __typename: "Note",
            id
          });
          const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });
          const updatedNote = {
            ...note,
            title,
            content
          };
          cache.writeFragment({
            id: noteId,
            fragment: NOTE_FRAGMENT,
            data: updatedNote
          });
          saveNotes(cache);
          return updatedNote;
        }
    }

};
export const typeDefs = [
    `
    schema {
        query: Query
        mutation: Mutation
    }
    type Query {
        notes: [Note]!
        note(id: Int!): Note
    }
    type Mutation {
        createNote(title: String!, content: String!) : Note
        editNote(id: String!, title: String!, content: String!) : Note
    }
    type Note {
        id: Int!
        title: String!
        content: String!
    }
    `
];
