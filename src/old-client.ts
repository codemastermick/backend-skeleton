// import { gql, GraphQLClient } from 'graphql-request';
// const endpoint = process.env.GRAPHCMS_ENDPOINT;
// const token = process.env.GRAPHCMS_TOKEN;

// export const client = new GraphQLClient(
//     endpoint,
//     {
//         headers: {
//             authorization: `Bearer ${token}`,
//         }
//     }
// );

// async function GetListLength(listID: string): Promise<number> {
//     const variables = {
//         uid: listID
//     }
//     const query = gql`
//   query GetListPositions($uid: ID!) {
//     lists(where: {id: $uid}) {
//       items{
//         listPosition
//       }
//     }
//   }`
//     const res = await client.request(query, variables);
//     return res.lists[0].items.length;
// }

// export const GetRoadmap = async (): Promise<any> => {
//     const roadmapQuery = gql`
//       query PublicRoadmap {
//         boards(where: { id: "ckwkv3alsf9hk0a42xk39um7o" }) {
//           title
//           lists {
//             title
//             items {
//               title
//               content
//               tags {
//                 label
//                 colour {
//                   hex
//                 }
//               }
//             }
//           }
//         }
//       }
//     `;
//     return await client.request(roadmapQuery);
// }

// async function AddNewBoard(title: string): Promise<number> {
//     let owner: string;

//     const variables = {
//         title,
//         owner
//     }

//     const query = gql`
//     mutation CreateBoardWithVariables($title:String!,$owner:String!) {
//       createBoard(data: {title: $title, owner: $owner, visibility: Private}){
//         id
//       }
//     }
//   `;
//     return await client.request(query, variables);
// }

// async function AddNewItem(listID: string, title: string, content: string): Promise<number> {
//     const length = await GetListLength(listID);

//     const variables = {
//         id: listID,
//         title,
//         listPosition: length + 1,
//         content
//     }

//     const query = gql`
//     mutation AddItemToList($id:ID!,$title:String!,$listPosition:Int!,$content:String!) {
//       updateList(
//         where: {id: $id}
//         data: {items: {create: {title: $title, listPosition: $listPosition, content: $content}}}
//       ){
//         id
//       }
//   }`

//     return await client.request(query, variables);
// }

// export { AddNewBoard as NewBoard, AddNewItem as NewItem }
