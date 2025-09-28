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
    "\n  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {\n    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {\n      registerToken\n    }\n  }\n": typeof types.GetUserAccountRegisterTokenFromGoogleAuthCodeDocument,
    "\n  mutation AddUserAccountByGoogleAuth(\n    $registerToken: String!\n    $userSettingId: String!\n    $name: String!\n  ) {\n    addUserAccountByGoogleAuth(\n      registerToken: $registerToken\n      userSettingId: $userSettingId\n      name: $name\n    ) {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n": typeof types.AddUserAccountByGoogleAuthDocument,
    "\n  query GetUserAccountFromAuthHeader {\n    getUserAccountFromAuthHeader {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n": typeof types.GetUserAccountFromAuthHeaderDocument,
    "\n  mutation LoginByGoogleAuth($authCode: String!) {\n    loginByGoogleAuth(authCode: $authCode) {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n": typeof types.LoginByGoogleAuthDocument,
    "\n  query GetMyNovels {\n    getMyNovels {\n      id\n      title\n      description\n    }\n  }\n": typeof types.GetMyNovelsDocument,
    "\n  mutation AddNovel($title: String!, $description: String) {\n    addNovel(title: $title, description: $description)\n  }\n": typeof types.AddNovelDocument,
    "\n  mutation EditNovel($id: String!, $title: String!, $description: String) {\n    editNovel(id: $id, title: $title, description: $description)\n  }\n": typeof types.EditNovelDocument,
    "\n  mutation DeleteNovel($id: String!) {\n    deleteNovel(id: $id)\n  }\n": typeof types.DeleteNovelDocument,
    "\n  query GetNovelSettings($novelId: String!) {\n    getMyNovelById(novelId: $novelId) {\n      id\n      title\n      description\n    }\n    getMyNovelSettings(novelId: $novelId) {\n      id\n      name\n      novelId\n      parentSettingId\n      displayOrder\n      attributes\n      description\n    }\n  }\n": typeof types.GetNovelSettingsDocument,
    "\n  mutation RegisterNovelSettings($inputs: [NovelSettingRegisterInput!]!) {\n    registerNovelSettings(inputs: $inputs)\n  }\n": typeof types.RegisterNovelSettingsDocument,
};
const documents: Documents = {
    "\n  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {\n    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {\n      registerToken\n    }\n  }\n": types.GetUserAccountRegisterTokenFromGoogleAuthCodeDocument,
    "\n  mutation AddUserAccountByGoogleAuth(\n    $registerToken: String!\n    $userSettingId: String!\n    $name: String!\n  ) {\n    addUserAccountByGoogleAuth(\n      registerToken: $registerToken\n      userSettingId: $userSettingId\n      name: $name\n    ) {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n": types.AddUserAccountByGoogleAuthDocument,
    "\n  query GetUserAccountFromAuthHeader {\n    getUserAccountFromAuthHeader {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n": types.GetUserAccountFromAuthHeaderDocument,
    "\n  mutation LoginByGoogleAuth($authCode: String!) {\n    loginByGoogleAuth(authCode: $authCode) {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n": types.LoginByGoogleAuthDocument,
    "\n  query GetMyNovels {\n    getMyNovels {\n      id\n      title\n      description\n    }\n  }\n": types.GetMyNovelsDocument,
    "\n  mutation AddNovel($title: String!, $description: String) {\n    addNovel(title: $title, description: $description)\n  }\n": types.AddNovelDocument,
    "\n  mutation EditNovel($id: String!, $title: String!, $description: String) {\n    editNovel(id: $id, title: $title, description: $description)\n  }\n": types.EditNovelDocument,
    "\n  mutation DeleteNovel($id: String!) {\n    deleteNovel(id: $id)\n  }\n": types.DeleteNovelDocument,
    "\n  query GetNovelSettings($novelId: String!) {\n    getMyNovelById(novelId: $novelId) {\n      id\n      title\n      description\n    }\n    getMyNovelSettings(novelId: $novelId) {\n      id\n      name\n      novelId\n      parentSettingId\n      displayOrder\n      attributes\n      description\n    }\n  }\n": types.GetNovelSettingsDocument,
    "\n  mutation RegisterNovelSettings($inputs: [NovelSettingRegisterInput!]!) {\n    registerNovelSettings(inputs: $inputs)\n  }\n": types.RegisterNovelSettingsDocument,
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
export function graphql(source: "\n  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {\n    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {\n      registerToken\n    }\n  }\n"): (typeof documents)["\n  query GetUserAccountRegisterTokenFromGoogleAuthCode($authCode: String!) {\n    getUserAccountRegisterTokenFromGoogleAuthCode(authCode: $authCode) {\n      registerToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddUserAccountByGoogleAuth(\n    $registerToken: String!\n    $userSettingId: String!\n    $name: String!\n  ) {\n    addUserAccountByGoogleAuth(\n      registerToken: $registerToken\n      userSettingId: $userSettingId\n      name: $name\n    ) {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  mutation AddUserAccountByGoogleAuth(\n    $registerToken: String!\n    $userSettingId: String!\n    $name: String!\n  ) {\n    addUserAccountByGoogleAuth(\n      registerToken: $registerToken\n      userSettingId: $userSettingId\n      name: $name\n    ) {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserAccountFromAuthHeader {\n    getUserAccountFromAuthHeader {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  query GetUserAccountFromAuthHeader {\n    getUserAccountFromAuthHeader {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginByGoogleAuth($authCode: String!) {\n    loginByGoogleAuth(authCode: $authCode) {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  mutation LoginByGoogleAuth($authCode: String!) {\n    loginByGoogleAuth(authCode: $authCode) {\n      token\n      userSettingId\n      name\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyNovels {\n    getMyNovels {\n      id\n      title\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetMyNovels {\n    getMyNovels {\n      id\n      title\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddNovel($title: String!, $description: String) {\n    addNovel(title: $title, description: $description)\n  }\n"): (typeof documents)["\n  mutation AddNovel($title: String!, $description: String) {\n    addNovel(title: $title, description: $description)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditNovel($id: String!, $title: String!, $description: String) {\n    editNovel(id: $id, title: $title, description: $description)\n  }\n"): (typeof documents)["\n  mutation EditNovel($id: String!, $title: String!, $description: String) {\n    editNovel(id: $id, title: $title, description: $description)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteNovel($id: String!) {\n    deleteNovel(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteNovel($id: String!) {\n    deleteNovel(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNovelSettings($novelId: String!) {\n    getMyNovelById(novelId: $novelId) {\n      id\n      title\n      description\n    }\n    getMyNovelSettings(novelId: $novelId) {\n      id\n      name\n      novelId\n      parentSettingId\n      displayOrder\n      attributes\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetNovelSettings($novelId: String!) {\n    getMyNovelById(novelId: $novelId) {\n      id\n      title\n      description\n    }\n    getMyNovelSettings(novelId: $novelId) {\n      id\n      name\n      novelId\n      parentSettingId\n      displayOrder\n      attributes\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterNovelSettings($inputs: [NovelSettingRegisterInput!]!) {\n    registerNovelSettings(inputs: $inputs)\n  }\n"): (typeof documents)["\n  mutation RegisterNovelSettings($inputs: [NovelSettingRegisterInput!]!) {\n    registerNovelSettings(inputs: $inputs)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;