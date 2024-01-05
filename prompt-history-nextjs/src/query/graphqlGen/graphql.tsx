import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "account_users" */
export type Account_Users = {
  __typename?: 'account_users';
  email?: Maybe<Scalars['String']['output']>;
  gmail?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "account_users" */
export type Account_Users_Aggregate = {
  __typename?: 'account_users_aggregate';
  aggregate?: Maybe<Account_Users_Aggregate_Fields>;
  nodes: Array<Account_Users>;
};

/** aggregate fields of "account_users" */
export type Account_Users_Aggregate_Fields = {
  __typename?: 'account_users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Users_Max_Fields>;
  min?: Maybe<Account_Users_Min_Fields>;
};


/** aggregate fields of "account_users" */
export type Account_Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "account_users". All fields are combined with a logical 'AND'. */
export type Account_Users_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Users_Bool_Exp>>;
  _not?: InputMaybe<Account_Users_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Users_Bool_Exp>>;
  email?: InputMaybe<String_Comparison_Exp>;
  gmail?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "account_users" */
export enum Account_Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  AccountUsersEmailKey = 'account_users_email_key',
  /** unique or primary key constraint on columns "gmail" */
  AccountUsersGmailKey = 'account_users_gmail_key',
  /** unique or primary key constraint on columns "id" */
  AccountUsersPkey = 'account_users_pkey'
}

/** input type for inserting data into table "account_users" */
export type Account_Users_Insert_Input = {
  email?: InputMaybe<Scalars['String']['input']>;
  gmail?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Account_Users_Max_Fields = {
  __typename?: 'account_users_max_fields';
  email?: Maybe<Scalars['String']['output']>;
  gmail?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Account_Users_Min_Fields = {
  __typename?: 'account_users_min_fields';
  email?: Maybe<Scalars['String']['output']>;
  gmail?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "account_users" */
export type Account_Users_Mutation_Response = {
  __typename?: 'account_users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Account_Users>;
};

/** on_conflict condition type for table "account_users" */
export type Account_Users_On_Conflict = {
  constraint: Account_Users_Constraint;
  update_columns?: Array<Account_Users_Update_Column>;
  where?: InputMaybe<Account_Users_Bool_Exp>;
};

/** Ordering options when selecting data from "account_users". */
export type Account_Users_Order_By = {
  email?: InputMaybe<Order_By>;
  gmail?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
};

/** primary key columns input for table: account_users */
export type Account_Users_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "account_users" */
export enum Account_Users_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Gmail = 'gmail',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Password = 'password'
}

/** input type for updating data in table "account_users" */
export type Account_Users_Set_Input = {
  email?: InputMaybe<Scalars['String']['input']>;
  gmail?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "account_users" */
export type Account_Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Users_Stream_Cursor_Value_Input = {
  email?: InputMaybe<Scalars['String']['input']>;
  gmail?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "account_users" */
export enum Account_Users_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Gmail = 'gmail',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Password = 'password'
}

export type Account_Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Account_Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Account_Users_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "account_users" */
  delete_account_users?: Maybe<Account_Users_Mutation_Response>;
  /** delete single row from the table: "account_users" */
  delete_account_users_by_pk?: Maybe<Account_Users>;
  /** insert data into the table: "account_users" */
  insert_account_users?: Maybe<Account_Users_Mutation_Response>;
  /** insert a single row into the table: "account_users" */
  insert_account_users_one?: Maybe<Account_Users>;
  /** update data of the table: "account_users" */
  update_account_users?: Maybe<Account_Users_Mutation_Response>;
  /** update single row of the table: "account_users" */
  update_account_users_by_pk?: Maybe<Account_Users>;
  /** update multiples rows of table: "account_users" */
  update_account_users_many?: Maybe<Array<Maybe<Account_Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Account_UsersArgs = {
  where: Account_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Account_Users_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootInsert_Account_UsersArgs = {
  objects: Array<Account_Users_Insert_Input>;
  on_conflict?: InputMaybe<Account_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Account_Users_OneArgs = {
  object: Account_Users_Insert_Input;
  on_conflict?: InputMaybe<Account_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Account_UsersArgs = {
  _set?: InputMaybe<Account_Users_Set_Input>;
  where: Account_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Account_Users_By_PkArgs = {
  _set?: InputMaybe<Account_Users_Set_Input>;
  pk_columns: Account_Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Account_Users_ManyArgs = {
  updates: Array<Account_Users_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "account_users" */
  account_users: Array<Account_Users>;
  /** fetch aggregated fields from the table: "account_users" */
  account_users_aggregate: Account_Users_Aggregate;
  /** fetch data from the table: "account_users" using primary key columns */
  account_users_by_pk?: Maybe<Account_Users>;
};


export type Query_RootAccount_UsersArgs = {
  distinct_on?: InputMaybe<Array<Account_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Users_Order_By>>;
  where?: InputMaybe<Account_Users_Bool_Exp>;
};


export type Query_RootAccount_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Users_Order_By>>;
  where?: InputMaybe<Account_Users_Bool_Exp>;
};


export type Query_RootAccount_Users_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "account_users" */
  account_users: Array<Account_Users>;
  /** fetch aggregated fields from the table: "account_users" */
  account_users_aggregate: Account_Users_Aggregate;
  /** fetch data from the table: "account_users" using primary key columns */
  account_users_by_pk?: Maybe<Account_Users>;
  /** fetch data from the table in a streaming manner: "account_users" */
  account_users_stream: Array<Account_Users>;
};


export type Subscription_RootAccount_UsersArgs = {
  distinct_on?: InputMaybe<Array<Account_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Users_Order_By>>;
  where?: InputMaybe<Account_Users_Bool_Exp>;
};


export type Subscription_RootAccount_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Users_Order_By>>;
  where?: InputMaybe<Account_Users_Bool_Exp>;
};


export type Subscription_RootAccount_Users_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Users_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Users_Bool_Exp>;
};

export type AccountUsersByGmailQueryVariables = Exact<{
  gmail: Scalars['String']['input'];
}>;


export type AccountUsersByGmailQuery = { __typename?: 'query_root', account_users: Array<{ __typename?: 'account_users', id: string }> };


export const AccountUsersByGmailDocument = gql`
    query AccountUsersByGmail($gmail: String!) {
  account_users(where: {gmail: {_eq: $gmail}}) {
    id
  }
}
    `;

/**
 * __useAccountUsersByGmailQuery__
 *
 * To run a query within a React component, call `useAccountUsersByGmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountUsersByGmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountUsersByGmailQuery({
 *   variables: {
 *      gmail: // value for 'gmail'
 *   },
 * });
 */
export function useAccountUsersByGmailQuery(baseOptions: Apollo.QueryHookOptions<AccountUsersByGmailQuery, AccountUsersByGmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountUsersByGmailQuery, AccountUsersByGmailQueryVariables>(AccountUsersByGmailDocument, options);
      }
export function useAccountUsersByGmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountUsersByGmailQuery, AccountUsersByGmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountUsersByGmailQuery, AccountUsersByGmailQueryVariables>(AccountUsersByGmailDocument, options);
        }
export function useAccountUsersByGmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountUsersByGmailQuery, AccountUsersByGmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountUsersByGmailQuery, AccountUsersByGmailQueryVariables>(AccountUsersByGmailDocument, options);
        }
export type AccountUsersByGmailQueryHookResult = ReturnType<typeof useAccountUsersByGmailQuery>;
export type AccountUsersByGmailLazyQueryHookResult = ReturnType<typeof useAccountUsersByGmailLazyQuery>;
export type AccountUsersByGmailSuspenseQueryHookResult = ReturnType<typeof useAccountUsersByGmailSuspenseQuery>;
export type AccountUsersByGmailQueryResult = Apollo.QueryResult<AccountUsersByGmailQuery, AccountUsersByGmailQueryVariables>;