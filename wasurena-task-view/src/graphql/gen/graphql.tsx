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
  Time: { input: Date; output: Date; }
};

export type CategoryInput = {
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
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
  deleteCategory: FieldWrapper<Scalars['Boolean']['output']>;
  deleteTask: FieldWrapper<Scalars['Boolean']['output']>;
  deleteTaskExecute: FieldWrapper<Scalars['Boolean']['output']>;
  executeScheduleCheckBatch: FieldWrapper<Scalars['Boolean']['output']>;
  updateCategory: FieldWrapper<Scalars['Boolean']['output']>;
};


export type MutationCreateCategoryArgs = {
  input: CategoryInput;
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


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaskExecuteArgs = {
  taskExecuteId: Scalars['String']['input'];
};


export type MutationExecuteScheduleCheckBatchArgs = {
  token: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String']['input'];
  input: CategoryInput;
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
  getTaskCategories?: Maybe<Array<FieldWrapper<TaskCategoryResponse>>>;
  getTaskCategoryById?: Maybe<FieldWrapper<TaskCategoryResponse>>;
  getTaskCheckDisplayList?: Maybe<Array<FieldWrapper<TaskCheckDisplayResponse>>>;
  getTaskDefinitions?: Maybe<Array<FieldWrapper<TaskDefinitionResponse>>>;
  getTaskExecuteListByDefinitionId?: Maybe<Array<FieldWrapper<TaskExecuteResponse>>>;
  getUserAccountFromAuthHeader?: Maybe<FieldWrapper<UserAccountResponse>>;
  getUserRegisterToken?: Maybe<FieldWrapper<CreateUserRegisterTokenResponse>>;
};


export type QueryGetRegisteredUserArgs = {
  lineAuthCode: Scalars['String']['input'];
};


export type QueryGetTaskCategoryByIdArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryGetTaskExecuteListByDefinitionIdArgs = {
  taskDefinitionId: Scalars['String']['input'];
};


export type QueryGetUserRegisterTokenArgs = {
  lineAuthCode: Scalars['String']['input'];
};

export type TaskCategoryResponse = {
  __typename?: 'TaskCategoryResponse';
  displayOrder?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  id: FieldWrapper<Scalars['String']['output']>;
  name: FieldWrapper<Scalars['String']['output']>;
};

export type TaskCheckDisplayResponse = {
  __typename?: 'TaskCheckDisplayResponse';
  categoryId?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  categoryName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  deadLineCheck?: Maybe<FieldWrapper<DeadLineCheck>>;
  deadLineCheckSubSetting?: Maybe<FieldWrapper<Scalars['Map']['output']>>;
  detail?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  displayFlag: FieldWrapper<Scalars['Boolean']['output']>;
  id: FieldWrapper<Scalars['String']['output']>;
  isExceedDeadLine: FieldWrapper<Scalars['Boolean']['output']>;
  latestExecDateTime?: Maybe<FieldWrapper<Scalars['Time']['output']>>;
  notificationFlag: FieldWrapper<Scalars['Boolean']['output']>;
  title: FieldWrapper<Scalars['String']['output']>;
};

export type TaskDefinitionResponse = {
  __typename?: 'TaskDefinitionResponse';
  categoryId?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  categoryName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  deadLineCheck?: Maybe<FieldWrapper<DeadLineCheck>>;
  deadLineCheckSubSetting?: Maybe<FieldWrapper<Scalars['Map']['output']>>;
  detail?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  displayFlag: FieldWrapper<Scalars['Boolean']['output']>;
  id: FieldWrapper<Scalars['String']['output']>;
  notificationFlag: FieldWrapper<Scalars['Boolean']['output']>;
  title: FieldWrapper<Scalars['String']['output']>;
};

export type TaskExecuteResponse = {
  __typename?: 'TaskExecuteResponse';
  executeDateTime: FieldWrapper<Scalars['Time']['output']>;
  id: FieldWrapper<Scalars['String']['output']>;
  memo?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  taskDefinitionId: FieldWrapper<Scalars['String']['output']>;
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

export type TaskCategoryObjFragment = { __typename?: 'TaskCategoryResponse', id: string, name: string, displayOrder?: number | null };

export type GetTaskCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskCategoriesQuery = { __typename?: 'Query', getTaskCategories?: Array<{ __typename?: 'TaskCategoryResponse', id: string, name: string, displayOrder?: number | null }> | null };

export type GetTaskCategoryByIdQueryVariables = Exact<{
  taskCategoryId: Scalars['String']['input'];
}>;


export type GetTaskCategoryByIdQuery = { __typename?: 'Query', getTaskCategoryById?: { __typename?: 'TaskCategoryResponse', id: string, name: string, displayOrder?: number | null } | null };

export type CreateTaskCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateTaskCategoryMutation = { __typename?: 'Mutation', createCategory: boolean };

export type UpdateTaskCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateTaskCategoryMutation = { __typename?: 'Mutation', updateCategory: boolean };

export type DeleteTaskCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskCategoryMutation = { __typename?: 'Mutation', deleteCategory: boolean };

export type CreateTaskExecuteMutationVariables = Exact<{
  taskDefinitionId: Scalars['String']['input'];
  memo?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateTaskExecuteMutation = { __typename?: 'Mutation', createTaskExecute: boolean };

export type GetTaskExecuteListByDefinitionIdQueryVariables = Exact<{
  taskDefinitionId: Scalars['String']['input'];
}>;


export type GetTaskExecuteListByDefinitionIdQuery = { __typename?: 'Query', getTaskExecuteListByDefinitionId?: Array<{ __typename?: 'TaskExecuteResponse', id: string, taskDefinitionId: string, executeDateTime: Date, memo?: string | null }> | null };

export type DeleteTaskExecuteMutationVariables = Exact<{
  taskExecuteId: Scalars['String']['input'];
}>;


export type DeleteTaskExecuteMutation = { __typename?: 'Mutation', deleteTaskExecute: boolean };

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

export type GetTaskDefinitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskDefinitionsQuery = { __typename?: 'Query', getTaskDefinitions?: Array<{ __typename?: 'TaskDefinitionResponse', id: string, title: string, displayFlag: boolean, notificationFlag: boolean, categoryId?: string | null, categoryName?: string | null, deadLineCheck?: DeadLineCheck | null, deadLineCheckSubSetting?: object | null, detail?: string | null }> | null };

export type GetTaskCheckDisplayListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskCheckDisplayListQuery = { __typename?: 'Query', getTaskCheckDisplayList?: Array<{ __typename?: 'TaskCheckDisplayResponse', id: string, title: string, displayFlag: boolean, notificationFlag: boolean, categoryId?: string | null, categoryName?: string | null, deadLineCheck?: DeadLineCheck | null, deadLineCheckSubSetting?: object | null, latestExecDateTime?: Date | null, isExceedDeadLine: boolean }> | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type GetTaskCategoriesForTaskDefinitionQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskCategoriesForTaskDefinitionQueryQuery = { __typename?: 'Query', getTaskCategories?: Array<{ __typename?: 'TaskCategoryResponse', id: string, name: string, displayOrder?: number | null }> | null };

export const AccountUserObjFragmentDoc = gql`
    fragment AccountUserObj on UserAccountResponse {
  token
  userName
  userSettingId
  imageUrl
  isLineBotFollow
}
    `;
export const TaskCategoryObjFragmentDoc = gql`
    fragment TaskCategoryObj on TaskCategoryResponse {
  id
  name
  displayOrder
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
export const GetTaskCategoriesDocument = gql`
    query GetTaskCategories {
  getTaskCategories {
    ...TaskCategoryObj
  }
}
    ${TaskCategoryObjFragmentDoc}`;

export function useGetTaskCategoriesQuery(options?: Omit<Urql.UseQueryArgs<GetTaskCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTaskCategoriesQuery, GetTaskCategoriesQueryVariables>({ query: GetTaskCategoriesDocument, ...options });
};
export const GetTaskCategoryByIdDocument = gql`
    query GetTaskCategoryById($taskCategoryId: String!) {
  getTaskCategoryById(categoryId: $taskCategoryId) {
    ...TaskCategoryObj
  }
}
    ${TaskCategoryObjFragmentDoc}`;

export function useGetTaskCategoryByIdQuery(options: Omit<Urql.UseQueryArgs<GetTaskCategoryByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTaskCategoryByIdQuery, GetTaskCategoryByIdQueryVariables>({ query: GetTaskCategoryByIdDocument, ...options });
};
export const CreateTaskCategoryDocument = gql`
    mutation CreateTaskCategory($name: String!, $displayOrder: Int) {
  createCategory(input: {name: $name, displayOrder: $displayOrder})
}
    `;

export function useCreateTaskCategoryMutation() {
  return Urql.useMutation<CreateTaskCategoryMutation, CreateTaskCategoryMutationVariables>(CreateTaskCategoryDocument);
};
export const UpdateTaskCategoryDocument = gql`
    mutation UpdateTaskCategory($id: String!, $name: String!, $displayOrder: Int) {
  updateCategory(id: $id, input: {name: $name, displayOrder: $displayOrder})
}
    `;

export function useUpdateTaskCategoryMutation() {
  return Urql.useMutation<UpdateTaskCategoryMutation, UpdateTaskCategoryMutationVariables>(UpdateTaskCategoryDocument);
};
export const DeleteTaskCategoryDocument = gql`
    mutation DeleteTaskCategory($id: String!) {
  deleteCategory(id: $id)
}
    `;

export function useDeleteTaskCategoryMutation() {
  return Urql.useMutation<DeleteTaskCategoryMutation, DeleteTaskCategoryMutationVariables>(DeleteTaskCategoryDocument);
};
export const CreateTaskExecuteDocument = gql`
    mutation CreateTaskExecute($taskDefinitionId: String!, $memo: String) {
  createTaskExecute(input: {taskDefinitionId: $taskDefinitionId, memo: $memo})
}
    `;

export function useCreateTaskExecuteMutation() {
  return Urql.useMutation<CreateTaskExecuteMutation, CreateTaskExecuteMutationVariables>(CreateTaskExecuteDocument);
};
export const GetTaskExecuteListByDefinitionIdDocument = gql`
    query GetTaskExecuteListByDefinitionId($taskDefinitionId: String!) {
  getTaskExecuteListByDefinitionId(taskDefinitionId: $taskDefinitionId) {
    id
    taskDefinitionId
    executeDateTime
    memo
  }
}
    `;

export function useGetTaskExecuteListByDefinitionIdQuery(options: Omit<Urql.UseQueryArgs<GetTaskExecuteListByDefinitionIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTaskExecuteListByDefinitionIdQuery, GetTaskExecuteListByDefinitionIdQueryVariables>({ query: GetTaskExecuteListByDefinitionIdDocument, ...options });
};
export const DeleteTaskExecuteDocument = gql`
    mutation DeleteTaskExecute($taskExecuteId: String!) {
  deleteTaskExecute(taskExecuteId: $taskExecuteId)
}
    `;

export function useDeleteTaskExecuteMutation() {
  return Urql.useMutation<DeleteTaskExecuteMutation, DeleteTaskExecuteMutationVariables>(DeleteTaskExecuteDocument);
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
export const GetTaskDefinitionsDocument = gql`
    query GetTaskDefinitions {
  getTaskDefinitions {
    id
    title
    displayFlag
    notificationFlag
    categoryId
    categoryName
    deadLineCheck
    deadLineCheckSubSetting
    detail
  }
}
    `;

export function useGetTaskDefinitionsQuery(options?: Omit<Urql.UseQueryArgs<GetTaskDefinitionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTaskDefinitionsQuery, GetTaskDefinitionsQueryVariables>({ query: GetTaskDefinitionsDocument, ...options });
};
export const GetTaskCheckDisplayListDocument = gql`
    query GetTaskCheckDisplayList {
  getTaskCheckDisplayList {
    id
    title
    displayFlag
    notificationFlag
    categoryId
    categoryName
    deadLineCheck
    deadLineCheckSubSetting
    latestExecDateTime
    isExceedDeadLine
  }
}
    `;

export function useGetTaskCheckDisplayListQuery(options?: Omit<Urql.UseQueryArgs<GetTaskCheckDisplayListQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTaskCheckDisplayListQuery, GetTaskCheckDisplayListQueryVariables>({ query: GetTaskCheckDisplayListDocument, ...options });
};
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: String!) {
  deleteTask(id: $id)
}
    `;

export function useDeleteTaskMutation() {
  return Urql.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument);
};
export const GetTaskCategoriesForTaskDefinitionQueryDocument = gql`
    query GetTaskCategoriesForTaskDefinitionQuery {
  getTaskCategories {
    ...TaskCategoryObj
  }
}
    ${TaskCategoryObjFragmentDoc}`;

export function useGetTaskCategoriesForTaskDefinitionQueryQuery(options?: Omit<Urql.UseQueryArgs<GetTaskCategoriesForTaskDefinitionQueryQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTaskCategoriesForTaskDefinitionQueryQuery, GetTaskCategoriesForTaskDefinitionQueryQueryVariables>({ query: GetTaskCategoriesForTaskDefinitionQueryDocument, ...options });
};