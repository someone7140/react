/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment UserAccountAuthResponse on UserAccountAuthResponse {\n    authToken\n    name\n    userSettingId\n    imageUrl\n    urlList\n    detail\n  }\n": typeof types.UserAccountAuthResponseFragmentDoc,
    "\n  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {\n    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {\n      token\n      name\n      imageUrl\n    }\n  }\n": typeof types.GetUserAccountRegisterTokenFromGoogleAuthCodeDocument,
    "\n  query GetUserInfoFromAuthHeader {\n    getUserInfoFromAuthHeader {\n      ...UserAccountAuthResponse\n    }\n  }\n": typeof types.GetUserInfoFromAuthHeaderDocument,
    "\n  mutation RegisterUserAccountFromGoogle(\n    $token: String!\n    $name: String!\n    $userSettingId: String!\n    $urlList: [String!]!\n    $detail: String\n  ) {\n    registerUserAccountFromGoogle(\n      token: $token\n      userSettingId: $userSettingId\n      name: $name\n      urlList: $urlList\n      detail: $detail\n    ) {\n      ...UserAccountAuthResponse\n    }\n  }\n": typeof types.RegisterUserAccountFromGoogleDocument,
    "\n  mutation LoginByGoogle($authCode: String!) {\n    loginByGoogle(authCode: $authCode) {\n      ...UserAccountAuthResponse\n    }\n  }\n": typeof types.LoginByGoogleDocument,
};
const documents: Documents = {
    "\n  fragment UserAccountAuthResponse on UserAccountAuthResponse {\n    authToken\n    name\n    userSettingId\n    imageUrl\n    urlList\n    detail\n  }\n": types.UserAccountAuthResponseFragmentDoc,
    "\n  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {\n    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {\n      token\n      name\n      imageUrl\n    }\n  }\n": types.GetUserAccountRegisterTokenFromGoogleAuthCodeDocument,
    "\n  query GetUserInfoFromAuthHeader {\n    getUserInfoFromAuthHeader {\n      ...UserAccountAuthResponse\n    }\n  }\n": types.GetUserInfoFromAuthHeaderDocument,
    "\n  mutation RegisterUserAccountFromGoogle(\n    $token: String!\n    $name: String!\n    $userSettingId: String!\n    $urlList: [String!]!\n    $detail: String\n  ) {\n    registerUserAccountFromGoogle(\n      token: $token\n      userSettingId: $userSettingId\n      name: $name\n      urlList: $urlList\n      detail: $detail\n    ) {\n      ...UserAccountAuthResponse\n    }\n  }\n": types.RegisterUserAccountFromGoogleDocument,
    "\n  mutation LoginByGoogle($authCode: String!) {\n    loginByGoogle(authCode: $authCode) {\n      ...UserAccountAuthResponse\n    }\n  }\n": types.LoginByGoogleDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserAccountAuthResponse on UserAccountAuthResponse {\n    authToken\n    name\n    userSettingId\n    imageUrl\n    urlList\n    detail\n  }\n"): (typeof documents)["\n  fragment UserAccountAuthResponse on UserAccountAuthResponse {\n    authToken\n    name\n    userSettingId\n    imageUrl\n    urlList\n    detail\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {\n    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {\n      token\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {\n    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {\n      token\n      name\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserInfoFromAuthHeader {\n    getUserInfoFromAuthHeader {\n      ...UserAccountAuthResponse\n    }\n  }\n"): (typeof documents)["\n  query GetUserInfoFromAuthHeader {\n    getUserInfoFromAuthHeader {\n      ...UserAccountAuthResponse\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterUserAccountFromGoogle(\n    $token: String!\n    $name: String!\n    $userSettingId: String!\n    $urlList: [String!]!\n    $detail: String\n  ) {\n    registerUserAccountFromGoogle(\n      token: $token\n      userSettingId: $userSettingId\n      name: $name\n      urlList: $urlList\n      detail: $detail\n    ) {\n      ...UserAccountAuthResponse\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUserAccountFromGoogle(\n    $token: String!\n    $name: String!\n    $userSettingId: String!\n    $urlList: [String!]!\n    $detail: String\n  ) {\n    registerUserAccountFromGoogle(\n      token: $token\n      userSettingId: $userSettingId\n      name: $name\n      urlList: $urlList\n      detail: $detail\n    ) {\n      ...UserAccountAuthResponse\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginByGoogle($authCode: String!) {\n    loginByGoogle(authCode: $authCode) {\n      ...UserAccountAuthResponse\n    }\n  }\n"): (typeof documents)["\n  mutation LoginByGoogle($authCode: String!) {\n    loginByGoogle(authCode: $authCode) {\n      ...UserAccountAuthResponse\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;