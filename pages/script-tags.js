import gql from 'graphql-tag';
import { useQuery, useMutation, gql } from '@apollo/react-hooks';

const CREATE_SCRIPT_TAG = gql`
    mutation scriptTagCreate($input: ScriptTagInput!){
        scriptTagCreate(input: $input){
            scriptTag {

            }
        }
    }
`;

const QUERY_SCRIPT_TAGS = gql`
    query{
        scriptTags(first: 5){
            edges {
                node {
                    id
                    src
                    displayScope
                }
            }
        }
    }
`;

const DELETE_SCRIPT_TAG = gql`
    mutation scriptTagDelete($id: ID!){
        scriptTagDelete(id: $id){
            deletedScriptTagId
            useErrors {
                field
                message
            }
        }
    }
`;
function ScriptPage(){
    const {loading, error, data}= useQuery(QUERY_SCRIPT_TAGS);
    if(loading){
        return(
            <div>Loading....</div>
        )
    }

    if(error){
        return(
            <div>
                {error.message}
            </div>
        )
    }

    return(
        <div>
            <p>Script tag</p>
        </div>
    )
}
export default ScriptPage;