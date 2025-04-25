import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type FieldWrapper<T> = T;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Map: { input: object; output: object; }
};

export type CreateUserRegisterTokenResponse = {
  __typename?: 'CreateUserRegisterTokenResponse';
  lineName: FieldWrapper<Scalars['String']['output']>;
  token: FieldWrapper<Scalars['String']['output']>;
};

export enum DeadLineCheck {
  DailyHour = 'DailyHour',
  DailyOnce = 'DailyOnce',
  MonthDate = 'MonthDate',
  MonthOnce = 'MonthOnce',
  WeeklyDay = 'WeeklyDay',
  WeeklyDayInterval = 'WeeklyDayInterval',
  YearOnceDate = 'YearOnceDate'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: FieldWrapper<Scalars['Boolean']['output']>;
  createTask: FieldWrapper<Scalars['Boolean']['output']>;
  createTaskExecute: FieldWrapper<Scalars['Boolean']['output']>;
  createUserAccount?: Maybe<FieldWrapper<UserAccountResponse>>;
  executeScheduleCheckBatch: FieldWrapper<Scalars['Boolean']['output']>;
};


export type MutationCreateCategoryArgs = {
  input: NewCategory;
};


export type MutationCreateTaskArgs = {
  input: NewTask;
};


export type MutationCreateTaskExecuteArgs = {
  input: NewTaskExecute;
};


export type MutationCreateUserAccountArgs = {
  input: NewUserAccount;
};


export type MutationExecuteScheduleCheckBatchArgs = {
  token: Scalars['String']['input'];
};

export type NewCategory = {
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type NewTask = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  deadLineCheck?: InputMaybe<DeadLineCheck>;
  deadLineCheckSubSetting?: InputMaybe<Scalars['Map']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  displayFlag: Scalars['Boolean']['input'];
  notificationFlag: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type NewTaskExecute = {
  memo?: InputMaybe<Scalars['String']['input']>;
  taskDefinitionId: Scalars['String']['input'];
};

export type NewUserAccount = {
  authToken: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getRegisteredUser?: Maybe<FieldWrapper<UserAccountResponse>>;
  getUserAccountFromAuthHeader?: Maybe<FieldWrapper<UserAccountResponse>>;
  getUserRegisterToken?: Maybe<FieldWrapper<CreateUserRegisterTokenResponse>>;
  todos: Array<FieldWrapper<Todo>>;
};


export type QueryGetRegisteredUserArgs = {
  lineAuthCode: Scalars['String']['input'];
};


export type QueryGetUserRegisterTokenArgs = {
  lineAuthCode: Scalars['String']['input'];
};

export type Todo = {
  __typename?: 'Todo';
  done: FieldWrapper<Scalars['Boolean']['output']>;
  id: FieldWrapper<Scalars['ID']['output']>;
  text: FieldWrapper<Scalars['String']['output']>;
  user: FieldWrapper<User>;
};

export type User = {
  __typename?: 'User';
  id: FieldWrapper<Scalars['ID']['output']>;
  name: FieldWrapper<Scalars['String']['output']>;
};

export type UserAccountResponse = {
  __typename?: 'UserAccountResponse';
  imageUrl?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  isLineBotFollow: FieldWrapper<Scalars['Boolean']['output']>;
  token: FieldWrapper<Scalars['String']['output']>;
  userName: FieldWrapper<Scalars['String']['output']>;
  userSettingId: FieldWrapper<Scalars['String']['output']>;
};

export type AccountUserObjFragment = { __typename?: 'UserAccountResponse', token: string, userName: string, userSettingId: string, imageUrl?: string | null, isLineBotFollow: boolean };

export type GetUserRegisterTokenQueryVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type GetUserRegisterTokenQuery = { __typename?: 'Query', getUserRegisterToken?: { __typename?: 'CreateUserRegisterTokenResponse', token: string, lineName: string } | null };

export type CreateUserAccountMutationVariables = Exact<{
  authToken: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
}>;


export type CreateUserAccountMutation = { __typename?: 'Mutation', createUserAccount?: { __typename?: 'UserAccountResponse', token: string, userName: string, userSettingId: string, imageUrl?: string | null, isLineBotFollow: boolean } | null };

export type GetUserAccountFromAuthHeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAccountFromAuthHeaderQuery = { __typename?: 'Query', getUserAccountFromAuthHeader?: { __typename?: 'UserAccountResponse', token: string, userName: string, userSettingId: string, imageUrl?: string | null, isLineBotFollow: boolean } | null };

export type GetRegisteredUserQueryVariables = Exact<{
  authCode: Scalars['String']['input'];
}>;


export type GetRegisteredUserQuery = { __typename?: 'Query', getRegisteredUser?: { __typename?: 'UserAccountResponse', token: string, userName: string, userSettingId: string, imageUrl?: string | null, isLineBotFollow: boolean } | null };

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String']['input'];
  displayFlag: Scalars['Boolean']['input'];
  notificationFlag: Scalars['Boolean']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  deadLineCheck?: InputMaybe<DeadLineCheck>;
  deadLineCheckSubSetting?: InputMaybe<Scalars['Map']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: boolean };

export const AccountUserObjFragmentDoc = gql`
    fragment AccountUserObj on UserAccountResponse {
  token
  userName
  userSettingId
  imageUrl
  isLineBotFollow
}
    `;
export const GetUserRegisterTokenDocument = gql`
    query GetUserRegisterToken($authCode: String!) {
  getUserRegisterToken(lineAuthCode: $authCode) {
    token
    lineName
  }
}
    `;

export function useGetUserRegisterTokenQuery(options: Omit<Urql.UseQueryArgs<GetUserRegisterTokenQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserRegisterTokenQuery, GetUserRegisterTokenQueryVariables>({ query: GetUserRegisterTokenDocument, ...options });
};
export const CreateUserAccountDocument = gql`
    mutation CreateUserAccount($authToken: String!, $userName: String!, $userSettingId: String!) {
  createUserAccount(
    input: {authToken: $authToken, userName: $userName, userSettingId: $userSettingId}
  ) {
    ...AccountUserObj
  }
}
    ${AccountUserObjFragmentDoc}`;

export function useCreateUserAccountMutation() {
  return Urql.useMutation<CreateUserAccountMutation, CreateUserAccountMutationVariables>(CreateUserAccountDocument);
};
export const GetUserAccountFromAuthHeaderDocument = gql`
    query GetUserAccountFromAuthHeader {
  getUserAccountFromAuthHeader {
    ...AccountUserObj
  }
}
    ${AccountUserObjFragmentDoc}`;

export function useGetUserAccountFromAuthHeaderQuery(options?: Omit<Urql.UseQueryArgs<GetUserAccountFromAuthHeaderQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserAccountFromAuthHeaderQuery, GetUserAccountFromAuthHeaderQueryVariables>({ query: GetUserAccountFromAuthHeaderDocument, ...options });
};
export const GetRegisteredUserDocument = gql`
    query GetRegisteredUser($authCode: String!) {
  getRegisteredUser(lineAuthCode: $authCode) {
    ...AccountUserObj
  }
}
    ${AccountUserObjFragmentDoc}`;

export function useGetRegisteredUserQuery(options: Omit<Urql.UseQueryArgs<GetRegisteredUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetRegisteredUserQuery, GetRegisteredUserQueryVariables>({ query: GetRegisteredUserDocument, ...options });
};
export const CreateTaskDocument = gql`
    mutation CreateTask($title: String!, $displayFlag: Boolean!, $notificationFlag: Boolean!, $categoryId: String, $deadLineCheck: DeadLineCheck, $deadLineCheckSubSetting: Map, $detail: String) {
  createTask(
    input: {title: $title, displayFlag: $displayFlag, notificationFlag: $notificationFlag, categoryId: $categoryId, deadLineCheck: $deadLineCheck, deadLineCheckSubSetting: $deadLineCheckSubSetting, detail: $detail}
  )
}
    `;

export function useCreateTaskMutation() {
  return Urql.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument);
};