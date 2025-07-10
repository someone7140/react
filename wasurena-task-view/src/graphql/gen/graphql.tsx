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
  DateTime: { input: Date; output: Date; }
  JSON: { input: any; output: any; }
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
  createCategory?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  createTaskDefinition?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  createTaskExecute?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  createUserAccount?: Maybe<FieldWrapper<UserAccountResponse>>;
  deleteCategory?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  deleteTaskDefinition?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  deleteTaskExecute?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  executeTaskCheckNotifyBatch?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  updateCategory?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  updateTaskDefinition?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  updateUserAccount?: Maybe<FieldWrapper<UserAccountResponse>>;
};


export type MutationCreateCategoryArgs = {
  input: CategoryInput;
};


export type MutationCreateTaskDefinitionArgs = {
  input: TaskDefinitionInput;
};


export type MutationCreateTaskExecuteArgs = {
  input: TaskExecuteInput;
};


export type MutationCreateUserAccountArgs = {
  input: NewUserAccountInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaskDefinitionArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaskExecuteArgs = {
  id: Scalars['String']['input'];
};


export type MutationExecuteTaskCheckNotifyBatchArgs = {
  batchToken: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String']['input'];
  input: CategoryInput;
};


export type MutationUpdateTaskDefinitionArgs = {
  id: Scalars['String']['input'];
  input: TaskDefinitionInput;
};


export type MutationUpdateUserAccountArgs = {
  input: UpdateUserAccountInput;
};

export type NewUserAccountInput = {
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
  getTaskDefinitionById?: Maybe<FieldWrapper<TaskDefinitionResponse>>;
  getTaskDefinitions?: Maybe<Array<FieldWrapper<TaskDefinitionResponse>>>;
  getTaskExecuteListByDefinitionId?: Maybe<Array<FieldWrapper<TaskExecuteResponse>>>;
  getUserAccountFromAuthHeader?: Maybe<FieldWrapper<UserAccountResponse>>;
  getUserRegisterToken?: Maybe<FieldWrapper<CreateUserRegisterTokenResponse>>;
};


export type QueryGetRegisteredUserArgs = {
  lineAuthCode: Scalars['String']['input'];
};


export type QueryGetTaskCategoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTaskDefinitionByIdArgs = {
  id: Scalars['String']['input'];
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
  deadLineCheckSubSetting?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  detail?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  displayFlag: FieldWrapper<Scalars['Boolean']['output']>;
  id: FieldWrapper<Scalars['String']['output']>;
  isExceedDeadLine: FieldWrapper<Scalars['Boolean']['output']>;
  latestExecDateTime?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  nextDeadLineDateTime?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  notificationFlag: FieldWrapper<Scalars['Boolean']['output']>;
  title: FieldWrapper<Scalars['String']['output']>;
};

export type TaskDefinitionInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  deadLineCheck?: InputMaybe<DeadLineCheck>;
  deadLineCheckSubSetting?: InputMaybe<Scalars['JSON']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  displayFlag: Scalars['Boolean']['input'];
  notificationFlag: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type TaskDefinitionResponse = {
  __typename?: 'TaskDefinitionResponse';
  categoryId?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  categoryName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  deadLineCheck?: Maybe<FieldWrapper<DeadLineCheck>>;
  deadLineCheckSubSetting?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  detail?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  displayFlag: FieldWrapper<Scalars['Boolean']['output']>;
  id: FieldWrapper<Scalars['String']['output']>;
  notificationFlag: FieldWrapper<Scalars['Boolean']['output']>;
  title: FieldWrapper<Scalars['String']['output']>;
};

export type TaskExecuteInput = {
  memo?: InputMaybe<Scalars['String']['input']>;
  taskDefinitionId: Scalars['String']['input'];
};

export type TaskExecuteResponse = {
  __typename?: 'TaskExecuteResponse';
  executeDateTime: FieldWrapper<Scalars['DateTime']['output']>;
  id: FieldWrapper<Scalars['String']['output']>;
  memo?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  taskDefinitionId: FieldWrapper<Scalars['String']['output']>;
};

export type UpdateUserAccountInput = {
  userName: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
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

export type UpdateUserAccountMutationVariables = Exact<{
  userName: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
}>;


export type UpdateUserAccountMutation = { __typename?: 'Mutation', updateUserAccount?: { __typename?: 'UserAccountResponse', token: string, userName: string, userSettingId: string, imageUrl?: string | null, isLineBotFollow: boolean } | null };

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


export type CreateTaskCategoryMutation = { __typename?: 'Mutation', createCategory?: boolean | null };

export type UpdateTaskCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateTaskCategoryMutation = { __typename?: 'Mutation', updateCategory?: boolean | null };

export type DeleteTaskCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskCategoryMutation = { __typename?: 'Mutation', deleteCategory?: boolean | null };

export type CreateTaskExecuteMutationVariables = Exact<{
  taskDefinitionId: Scalars['String']['input'];
  memo?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateTaskExecuteMutation = { __typename?: 'Mutation', createTaskExecute?: boolean | null };

export type GetTaskExecuteListByDefinitionIdQueryVariables = Exact<{
  taskDefinitionId: Scalars['String']['input'];
}>;


export type GetTaskExecuteListByDefinitionIdQuery = { __typename?: 'Query', getTaskExecuteListByDefinitionId?: Array<{ __typename?: 'TaskExecuteResponse', id: string, taskDefinitionId: string, executeDateTime: Date, memo?: string | null }> | null };

export type DeleteTaskExecuteMutationVariables = Exact<{
  taskExecuteId: Scalars['String']['input'];
}>;


export type DeleteTaskExecuteMutation = { __typename?: 'Mutation', deleteTaskExecute?: boolean | null };

export type TaskDefinitionObjFragment = { __typename?: 'TaskDefinitionResponse', id: string, title: string, displayFlag: boolean, notificationFlag: boolean, categoryId?: string | null, categoryName?: string | null, deadLineCheck?: DeadLineCheck | null, deadLineCheckSubSetting?: any | null, detail?: string | null };

export type TaskCheckDisplayObjFragment = { __typename?: 'TaskCheckDisplayResponse', id: string, title: string, displayFlag: boolean, notificationFlag: boolean, categoryId?: string | null, categoryName?: string | null, deadLineCheck?: DeadLineCheck | null, deadLineCheckSubSetting?: any | null, latestExecDateTime?: Date | null, nextDeadLineDateTime?: Date | null, isExceedDeadLine: boolean };

export type CreateTaskDefinitionMutationVariables = Exact<{
  title: Scalars['String']['input'];
  displayFlag: Scalars['Boolean']['input'];
  notificationFlag: Scalars['Boolean']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  deadLineCheck?: InputMaybe<DeadLineCheck>;
  deadLineCheckSubSetting?: InputMaybe<Scalars['JSON']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateTaskDefinitionMutation = { __typename?: 'Mutation', createTaskDefinition?: boolean | null };

export type UpdateTaskDefinitionMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  displayFlag: Scalars['Boolean']['input'];
  notificationFlag: Scalars['Boolean']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  deadLineCheck?: InputMaybe<DeadLineCheck>;
  deadLineCheckSubSetting?: InputMaybe<Scalars['JSON']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTaskDefinitionMutation = { __typename?: 'Mutation', updateTaskDefinition?: boolean | null };

export type GetTaskDefinitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskDefinitionsQuery = { __typename?: 'Query', getTaskDefinitions?: Array<{ __typename?: 'TaskDefinitionResponse', id: string, title: string, displayFlag: boolean, notificationFlag: boolean, categoryId?: string | null, categoryName?: string | null, deadLineCheck?: DeadLineCheck | null, deadLineCheckSubSetting?: any | null, detail?: string | null }> | null };

export type GetTaskDefinitionByIdAndCategoryQueryVariables = Exact<{
  taskDefinitionId: Scalars['String']['input'];
}>;


export type GetTaskDefinitionByIdAndCategoryQuery = { __typename?: 'Query', getTaskDefinitionById?: { __typename?: 'TaskDefinitionResponse', id: string, title: string, displayFlag: boolean, notificationFlag: boolean, categoryId?: string | null, categoryName?: string | null, deadLineCheck?: DeadLineCheck | null, deadLineCheckSubSetting?: any | null, detail?: string | null } | null, getTaskCategories?: Array<{ __typename?: 'TaskCategoryResponse', id: string, name: string, displayOrder?: number | null }> | null };

export type GetTaskCheckDisplayListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskCheckDisplayListQuery = { __typename?: 'Query', getTaskCheckDisplayList?: Array<{ __typename?: 'TaskCheckDisplayResponse', id: string, title: string, displayFlag: boolean, notificationFlag: boolean, categoryId?: string | null, categoryName?: string | null, deadLineCheck?: DeadLineCheck | null, deadLineCheckSubSetting?: any | null, latestExecDateTime?: Date | null, nextDeadLineDateTime?: Date | null, isExceedDeadLine: boolean }> | null };

export type GetTaskCheckDisplayListTopQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskCheckDisplayListTopQuery = { __typename?: 'Query', getTaskCheckDisplayList?: Array<{ __typename?: 'TaskCheckDisplayResponse', id: string, title: string, displayFlag: boolean, notificationFlag: boolean, categoryId?: string | null, categoryName?: string | null, deadLineCheck?: DeadLineCheck | null, deadLineCheckSubSetting?: any | null, latestExecDateTime?: Date | null, nextDeadLineDateTime?: Date | null, isExceedDeadLine: boolean }> | null };

export type DeleteTaskDefinitionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskDefinitionMutation = { __typename?: 'Mutation', deleteTaskDefinition?: boolean | null };

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
export const TaskDefinitionObjFragmentDoc = gql`
    fragment TaskDefinitionObj on TaskDefinitionResponse {
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
    `;
export const TaskCheckDisplayObjFragmentDoc = gql`
    fragment TaskCheckDisplayObj on TaskCheckDisplayResponse {
  id
  title
  displayFlag
  notificationFlag
  categoryId
  categoryName
  deadLineCheck
  deadLineCheckSubSetting
  latestExecDateTime
  nextDeadLineDateTime
  isExceedDeadLine
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
export const UpdateUserAccountDocument = gql`
    mutation UpdateUserAccount($userName: String!, $userSettingId: String!) {
  updateUserAccount(input: {userName: $userName, userSettingId: $userSettingId}) {
    ...AccountUserObj
  }
}
    ${AccountUserObjFragmentDoc}`;

export function useUpdateUserAccountMutation() {
  return Urql.useMutation<UpdateUserAccountMutation, UpdateUserAccountMutationVariables>(UpdateUserAccountDocument);
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
  getTaskCategoryById(id: $taskCategoryId) {
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
  deleteTaskExecute(id: $taskExecuteId)
}
    `;

export function useDeleteTaskExecuteMutation() {
  return Urql.useMutation<DeleteTaskExecuteMutation, DeleteTaskExecuteMutationVariables>(DeleteTaskExecuteDocument);
};
export const CreateTaskDefinitionDocument = gql`
    mutation CreateTaskDefinition($title: String!, $displayFlag: Boolean!, $notificationFlag: Boolean!, $categoryId: String, $deadLineCheck: DeadLineCheck, $deadLineCheckSubSetting: JSON, $detail: String) {
  createTaskDefinition(
    input: {title: $title, displayFlag: $displayFlag, notificationFlag: $notificationFlag, categoryId: $categoryId, deadLineCheck: $deadLineCheck, deadLineCheckSubSetting: $deadLineCheckSubSetting, detail: $detail}
  )
}
    `;

export function useCreateTaskDefinitionMutation() {
  return Urql.useMutation<CreateTaskDefinitionMutation, CreateTaskDefinitionMutationVariables>(CreateTaskDefinitionDocument);
};
export const UpdateTaskDefinitionDocument = gql`
    mutation UpdateTaskDefinition($id: String!, $title: String!, $displayFlag: Boolean!, $notificationFlag: Boolean!, $categoryId: String, $deadLineCheck: DeadLineCheck, $deadLineCheckSubSetting: JSON, $detail: String) {
  updateTaskDefinition(
    id: $id
    input: {title: $title, displayFlag: $displayFlag, notificationFlag: $notificationFlag, categoryId: $categoryId, deadLineCheck: $deadLineCheck, deadLineCheckSubSetting: $deadLineCheckSubSetting, detail: $detail}
  )
}
    `;

export function useUpdateTaskDefinitionMutation() {
  return Urql.useMutation<UpdateTaskDefinitionMutation, UpdateTaskDefinitionMutationVariables>(UpdateTaskDefinitionDocument);
};
export const GetTaskDefinitionsDocument = gql`
    query GetTaskDefinitions {
  getTaskDefinitions {
    ...TaskDefinitionObj
  }
}
    ${TaskDefinitionObjFragmentDoc}`;

export function useGetTaskDefinitionsQuery(options?: Omit<Urql.UseQueryArgs<GetTaskDefinitionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTaskDefinitionsQuery, GetTaskDefinitionsQueryVariables>({ query: GetTaskDefinitionsDocument, ...options });
};
export const GetTaskDefinitionByIdAndCategoryDocument = gql`
    query GetTaskDefinitionByIdAndCategory($taskDefinitionId: String!) {
  getTaskDefinitionById(id: $taskDefinitionId) {
    ...TaskDefinitionObj
  }
  getTaskCategories {
    ...TaskCategoryObj
  }
}
    ${TaskDefinitionObjFragmentDoc}
${TaskCategoryObjFragmentDoc}`;

export function useGetTaskDefinitionByIdAndCategoryQuery(options: Omit<Urql.UseQueryArgs<GetTaskDefinitionByIdAndCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTaskDefinitionByIdAndCategoryQuery, GetTaskDefinitionByIdAndCategoryQueryVariables>({ query: GetTaskDefinitionByIdAndCategoryDocument, ...options });
};
export const GetTaskCheckDisplayListDocument = gql`
    query GetTaskCheckDisplayList {
  getTaskCheckDisplayList {
    ...TaskCheckDisplayObj
  }
}
    ${TaskCheckDisplayObjFragmentDoc}`;

export function useGetTaskCheckDisplayListQuery(options?: Omit<Urql.UseQueryArgs<GetTaskCheckDisplayListQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTaskCheckDisplayListQuery, GetTaskCheckDisplayListQueryVariables>({ query: GetTaskCheckDisplayListDocument, ...options });
};
export const GetTaskCheckDisplayListTopDocument = gql`
    query GetTaskCheckDisplayListTop {
  getTaskCheckDisplayList {
    ...TaskCheckDisplayObj
  }
}
    ${TaskCheckDisplayObjFragmentDoc}`;

export function useGetTaskCheckDisplayListTopQuery(options?: Omit<Urql.UseQueryArgs<GetTaskCheckDisplayListTopQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTaskCheckDisplayListTopQuery, GetTaskCheckDisplayListTopQueryVariables>({ query: GetTaskCheckDisplayListTopDocument, ...options });
};
export const DeleteTaskDefinitionDocument = gql`
    mutation DeleteTaskDefinition($id: String!) {
  deleteTaskDefinition(id: $id)
}
    `;

export function useDeleteTaskDefinitionMutation() {
  return Urql.useMutation<DeleteTaskDefinitionMutation, DeleteTaskDefinitionMutationVariables>(DeleteTaskDefinitionDocument);
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