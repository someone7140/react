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
  timestamptz: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  problem_answers: Array<Problem_Answers>;
  /** An aggregate relationship */
  problem_answers_aggregate: Problem_Answers_Aggregate;
  /** An array relationship */
  problem_questions: Array<Problem_Questions>;
  /** An aggregate relationship */
  problem_questions_aggregate: Problem_Questions_Aggregate;
  /** An array relationship */
  problem_themes: Array<Problem_Themes>;
  /** An aggregate relationship */
  problem_themes_aggregate: Problem_Themes_Aggregate;
  userSettingId: Scalars['String']['output'];
};


/** columns and relationships of "account_users" */
export type Account_UsersProblem_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Answers_Order_By>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};


/** columns and relationships of "account_users" */
export type Account_UsersProblem_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Answers_Order_By>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};


/** columns and relationships of "account_users" */
export type Account_UsersProblem_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Problem_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Questions_Order_By>>;
  where?: InputMaybe<Problem_Questions_Bool_Exp>;
};


/** columns and relationships of "account_users" */
export type Account_UsersProblem_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Questions_Order_By>>;
  where?: InputMaybe<Problem_Questions_Bool_Exp>;
};


/** columns and relationships of "account_users" */
export type Account_UsersProblem_ThemesArgs = {
  distinct_on?: InputMaybe<Array<Problem_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Themes_Order_By>>;
  where?: InputMaybe<Problem_Themes_Bool_Exp>;
};


/** columns and relationships of "account_users" */
export type Account_UsersProblem_Themes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Themes_Order_By>>;
  where?: InputMaybe<Problem_Themes_Bool_Exp>;
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
  imageUrl?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  problem_answers?: InputMaybe<Problem_Answers_Bool_Exp>;
  problem_answers_aggregate?: InputMaybe<Problem_Answers_Aggregate_Bool_Exp>;
  problem_questions?: InputMaybe<Problem_Questions_Bool_Exp>;
  problem_questions_aggregate?: InputMaybe<Problem_Questions_Aggregate_Bool_Exp>;
  problem_themes?: InputMaybe<Problem_Themes_Bool_Exp>;
  problem_themes_aggregate?: InputMaybe<Problem_Themes_Aggregate_Bool_Exp>;
  userSettingId?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "account_users" */
export enum Account_Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  AccountUsersEmailKey = 'account_users_email_key',
  /** unique or primary key constraint on columns "gmail" */
  AccountUsersGmailKey = 'account_users_gmail_key',
  /** unique or primary key constraint on columns "id" */
  AccountUsersPkey = 'account_users_pkey',
  /** unique or primary key constraint on columns "user_setting_id" */
  AccountUsersUserSettingIdKey = 'account_users_user_setting_id_key'
}

/** input type for inserting data into table "account_users" */
export type Account_Users_Insert_Input = {
  email?: InputMaybe<Scalars['String']['input']>;
  gmail?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  problem_answers?: InputMaybe<Problem_Answers_Arr_Rel_Insert_Input>;
  problem_questions?: InputMaybe<Problem_Questions_Arr_Rel_Insert_Input>;
  problem_themes?: InputMaybe<Problem_Themes_Arr_Rel_Insert_Input>;
  userSettingId?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Account_Users_Max_Fields = {
  __typename?: 'account_users_max_fields';
  email?: Maybe<Scalars['String']['output']>;
  gmail?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  userSettingId?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Account_Users_Min_Fields = {
  __typename?: 'account_users_min_fields';
  email?: Maybe<Scalars['String']['output']>;
  gmail?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  userSettingId?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "account_users" */
export type Account_Users_Mutation_Response = {
  __typename?: 'account_users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Account_Users>;
};

/** input type for inserting object relation for remote table "account_users" */
export type Account_Users_Obj_Rel_Insert_Input = {
  data: Account_Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Account_Users_On_Conflict>;
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
  imageUrl?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  problem_answers_aggregate?: InputMaybe<Problem_Answers_Aggregate_Order_By>;
  problem_questions_aggregate?: InputMaybe<Problem_Questions_Aggregate_Order_By>;
  problem_themes_aggregate?: InputMaybe<Problem_Themes_Aggregate_Order_By>;
  userSettingId?: InputMaybe<Order_By>;
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
  ImageUrl = 'imageUrl',
  /** column name */
  Name = 'name',
  /** column name */
  Password = 'password',
  /** column name */
  UserSettingId = 'userSettingId'
}

/** input type for updating data in table "account_users" */
export type Account_Users_Set_Input = {
  email?: InputMaybe<Scalars['String']['input']>;
  gmail?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userSettingId?: InputMaybe<Scalars['String']['input']>;
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
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userSettingId?: InputMaybe<Scalars['String']['input']>;
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
  ImageUrl = 'imageUrl',
  /** column name */
  Name = 'name',
  /** column name */
  Password = 'password',
  /** column name */
  UserSettingId = 'userSettingId'
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
  /** delete data from the table: "problem_answers" */
  delete_problem_answers?: Maybe<Problem_Answers_Mutation_Response>;
  /** delete single row from the table: "problem_answers" */
  delete_problem_answers_by_pk?: Maybe<Problem_Answers>;
  /** delete data from the table: "problem_questions" */
  delete_problem_questions?: Maybe<Problem_Questions_Mutation_Response>;
  /** delete single row from the table: "problem_questions" */
  delete_problem_questions_by_pk?: Maybe<Problem_Questions>;
  /** delete data from the table: "problem_themes" */
  delete_problem_themes?: Maybe<Problem_Themes_Mutation_Response>;
  /** delete single row from the table: "problem_themes" */
  delete_problem_themes_by_pk?: Maybe<Problem_Themes>;
  /** insert data into the table: "account_users" */
  insert_account_users?: Maybe<Account_Users_Mutation_Response>;
  /** insert a single row into the table: "account_users" */
  insert_account_users_one?: Maybe<Account_Users>;
  /** insert data into the table: "problem_answers" */
  insert_problem_answers?: Maybe<Problem_Answers_Mutation_Response>;
  /** insert a single row into the table: "problem_answers" */
  insert_problem_answers_one?: Maybe<Problem_Answers>;
  /** insert data into the table: "problem_questions" */
  insert_problem_questions?: Maybe<Problem_Questions_Mutation_Response>;
  /** insert a single row into the table: "problem_questions" */
  insert_problem_questions_one?: Maybe<Problem_Questions>;
  /** insert data into the table: "problem_themes" */
  insert_problem_themes?: Maybe<Problem_Themes_Mutation_Response>;
  /** insert a single row into the table: "problem_themes" */
  insert_problem_themes_one?: Maybe<Problem_Themes>;
  /** update data of the table: "account_users" */
  update_account_users?: Maybe<Account_Users_Mutation_Response>;
  /** update single row of the table: "account_users" */
  update_account_users_by_pk?: Maybe<Account_Users>;
  /** update multiples rows of table: "account_users" */
  update_account_users_many?: Maybe<Array<Maybe<Account_Users_Mutation_Response>>>;
  /** update data of the table: "problem_answers" */
  update_problem_answers?: Maybe<Problem_Answers_Mutation_Response>;
  /** update single row of the table: "problem_answers" */
  update_problem_answers_by_pk?: Maybe<Problem_Answers>;
  /** update multiples rows of table: "problem_answers" */
  update_problem_answers_many?: Maybe<Array<Maybe<Problem_Answers_Mutation_Response>>>;
  /** update data of the table: "problem_questions" */
  update_problem_questions?: Maybe<Problem_Questions_Mutation_Response>;
  /** update single row of the table: "problem_questions" */
  update_problem_questions_by_pk?: Maybe<Problem_Questions>;
  /** update multiples rows of table: "problem_questions" */
  update_problem_questions_many?: Maybe<Array<Maybe<Problem_Questions_Mutation_Response>>>;
  /** update data of the table: "problem_themes" */
  update_problem_themes?: Maybe<Problem_Themes_Mutation_Response>;
  /** update single row of the table: "problem_themes" */
  update_problem_themes_by_pk?: Maybe<Problem_Themes>;
  /** update multiples rows of table: "problem_themes" */
  update_problem_themes_many?: Maybe<Array<Maybe<Problem_Themes_Mutation_Response>>>;
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
export type Mutation_RootDelete_Problem_AnswersArgs = {
  where: Problem_Answers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Problem_Answers_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Problem_QuestionsArgs = {
  where: Problem_Questions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Problem_Questions_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Problem_ThemesArgs = {
  where: Problem_Themes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Problem_Themes_By_PkArgs = {
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
export type Mutation_RootInsert_Problem_AnswersArgs = {
  objects: Array<Problem_Answers_Insert_Input>;
  on_conflict?: InputMaybe<Problem_Answers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Problem_Answers_OneArgs = {
  object: Problem_Answers_Insert_Input;
  on_conflict?: InputMaybe<Problem_Answers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Problem_QuestionsArgs = {
  objects: Array<Problem_Questions_Insert_Input>;
  on_conflict?: InputMaybe<Problem_Questions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Problem_Questions_OneArgs = {
  object: Problem_Questions_Insert_Input;
  on_conflict?: InputMaybe<Problem_Questions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Problem_ThemesArgs = {
  objects: Array<Problem_Themes_Insert_Input>;
  on_conflict?: InputMaybe<Problem_Themes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Problem_Themes_OneArgs = {
  object: Problem_Themes_Insert_Input;
  on_conflict?: InputMaybe<Problem_Themes_On_Conflict>;
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


/** mutation root */
export type Mutation_RootUpdate_Problem_AnswersArgs = {
  _set?: InputMaybe<Problem_Answers_Set_Input>;
  where: Problem_Answers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Problem_Answers_By_PkArgs = {
  _set?: InputMaybe<Problem_Answers_Set_Input>;
  pk_columns: Problem_Answers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Problem_Answers_ManyArgs = {
  updates: Array<Problem_Answers_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Problem_QuestionsArgs = {
  _set?: InputMaybe<Problem_Questions_Set_Input>;
  where: Problem_Questions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Problem_Questions_By_PkArgs = {
  _set?: InputMaybe<Problem_Questions_Set_Input>;
  pk_columns: Problem_Questions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Problem_Questions_ManyArgs = {
  updates: Array<Problem_Questions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Problem_ThemesArgs = {
  _set?: InputMaybe<Problem_Themes_Set_Input>;
  where: Problem_Themes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Problem_Themes_By_PkArgs = {
  _set?: InputMaybe<Problem_Themes_Set_Input>;
  pk_columns: Problem_Themes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Problem_Themes_ManyArgs = {
  updates: Array<Problem_Themes_Updates>;
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

/** columns and relationships of "problem_answers" */
export type Problem_Answers = {
  __typename?: 'problem_answers';
  acccountUserId: Scalars['String']['output'];
  /** An object relationship */
  account_user?: Maybe<Account_Users>;
  aiService?: Maybe<Scalars['String']['output']>;
  answerDateTime?: Maybe<Scalars['timestamptz']['output']>;
  contents: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  problem_questions?: Maybe<Problem_Questions>;
  /** An object relationship */
  problem_themes?: Maybe<Problem_Themes>;
  questionId: Scalars['String']['output'];
  themeId: Scalars['String']['output'];
};

/** aggregated selection of "problem_answers" */
export type Problem_Answers_Aggregate = {
  __typename?: 'problem_answers_aggregate';
  aggregate?: Maybe<Problem_Answers_Aggregate_Fields>;
  nodes: Array<Problem_Answers>;
};

export type Problem_Answers_Aggregate_Bool_Exp = {
  count?: InputMaybe<Problem_Answers_Aggregate_Bool_Exp_Count>;
};

export type Problem_Answers_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Problem_Answers_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "problem_answers" */
export type Problem_Answers_Aggregate_Fields = {
  __typename?: 'problem_answers_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Problem_Answers_Max_Fields>;
  min?: Maybe<Problem_Answers_Min_Fields>;
};


/** aggregate fields of "problem_answers" */
export type Problem_Answers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "problem_answers" */
export type Problem_Answers_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Problem_Answers_Max_Order_By>;
  min?: InputMaybe<Problem_Answers_Min_Order_By>;
};

/** input type for inserting array relation for remote table "problem_answers" */
export type Problem_Answers_Arr_Rel_Insert_Input = {
  data: Array<Problem_Answers_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Problem_Answers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "problem_answers". All fields are combined with a logical 'AND'. */
export type Problem_Answers_Bool_Exp = {
  _and?: InputMaybe<Array<Problem_Answers_Bool_Exp>>;
  _not?: InputMaybe<Problem_Answers_Bool_Exp>;
  _or?: InputMaybe<Array<Problem_Answers_Bool_Exp>>;
  acccountUserId?: InputMaybe<String_Comparison_Exp>;
  account_user?: InputMaybe<Account_Users_Bool_Exp>;
  aiService?: InputMaybe<String_Comparison_Exp>;
  answerDateTime?: InputMaybe<Timestamptz_Comparison_Exp>;
  contents?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  problem_questions?: InputMaybe<Problem_Questions_Bool_Exp>;
  problem_themes?: InputMaybe<Problem_Themes_Bool_Exp>;
  questionId?: InputMaybe<String_Comparison_Exp>;
  themeId?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "problem_answers" */
export enum Problem_Answers_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProblemAnswersPkey = 'problem_answers_pkey'
}

/** input type for inserting data into table "problem_answers" */
export type Problem_Answers_Insert_Input = {
  acccountUserId?: InputMaybe<Scalars['String']['input']>;
  account_user?: InputMaybe<Account_Users_Obj_Rel_Insert_Input>;
  aiService?: InputMaybe<Scalars['String']['input']>;
  answerDateTime?: InputMaybe<Scalars['timestamptz']['input']>;
  contents?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  problem_questions?: InputMaybe<Problem_Questions_Obj_Rel_Insert_Input>;
  problem_themes?: InputMaybe<Problem_Themes_Obj_Rel_Insert_Input>;
  questionId?: InputMaybe<Scalars['String']['input']>;
  themeId?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Problem_Answers_Max_Fields = {
  __typename?: 'problem_answers_max_fields';
  acccountUserId?: Maybe<Scalars['String']['output']>;
  aiService?: Maybe<Scalars['String']['output']>;
  answerDateTime?: Maybe<Scalars['timestamptz']['output']>;
  contents?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  questionId?: Maybe<Scalars['String']['output']>;
  themeId?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "problem_answers" */
export type Problem_Answers_Max_Order_By = {
  acccountUserId?: InputMaybe<Order_By>;
  aiService?: InputMaybe<Order_By>;
  answerDateTime?: InputMaybe<Order_By>;
  contents?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  questionId?: InputMaybe<Order_By>;
  themeId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Problem_Answers_Min_Fields = {
  __typename?: 'problem_answers_min_fields';
  acccountUserId?: Maybe<Scalars['String']['output']>;
  aiService?: Maybe<Scalars['String']['output']>;
  answerDateTime?: Maybe<Scalars['timestamptz']['output']>;
  contents?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  questionId?: Maybe<Scalars['String']['output']>;
  themeId?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "problem_answers" */
export type Problem_Answers_Min_Order_By = {
  acccountUserId?: InputMaybe<Order_By>;
  aiService?: InputMaybe<Order_By>;
  answerDateTime?: InputMaybe<Order_By>;
  contents?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  questionId?: InputMaybe<Order_By>;
  themeId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "problem_answers" */
export type Problem_Answers_Mutation_Response = {
  __typename?: 'problem_answers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Problem_Answers>;
};

/** on_conflict condition type for table "problem_answers" */
export type Problem_Answers_On_Conflict = {
  constraint: Problem_Answers_Constraint;
  update_columns?: Array<Problem_Answers_Update_Column>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};

/** Ordering options when selecting data from "problem_answers". */
export type Problem_Answers_Order_By = {
  acccountUserId?: InputMaybe<Order_By>;
  account_user?: InputMaybe<Account_Users_Order_By>;
  aiService?: InputMaybe<Order_By>;
  answerDateTime?: InputMaybe<Order_By>;
  contents?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  problem_questions?: InputMaybe<Problem_Questions_Order_By>;
  problem_themes?: InputMaybe<Problem_Themes_Order_By>;
  questionId?: InputMaybe<Order_By>;
  themeId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: problem_answers */
export type Problem_Answers_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "problem_answers" */
export enum Problem_Answers_Select_Column {
  /** column name */
  AcccountUserId = 'acccountUserId',
  /** column name */
  AiService = 'aiService',
  /** column name */
  AnswerDateTime = 'answerDateTime',
  /** column name */
  Contents = 'contents',
  /** column name */
  Id = 'id',
  /** column name */
  QuestionId = 'questionId',
  /** column name */
  ThemeId = 'themeId'
}

/** input type for updating data in table "problem_answers" */
export type Problem_Answers_Set_Input = {
  acccountUserId?: InputMaybe<Scalars['String']['input']>;
  aiService?: InputMaybe<Scalars['String']['input']>;
  answerDateTime?: InputMaybe<Scalars['timestamptz']['input']>;
  contents?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  questionId?: InputMaybe<Scalars['String']['input']>;
  themeId?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "problem_answers" */
export type Problem_Answers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Problem_Answers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Problem_Answers_Stream_Cursor_Value_Input = {
  acccountUserId?: InputMaybe<Scalars['String']['input']>;
  aiService?: InputMaybe<Scalars['String']['input']>;
  answerDateTime?: InputMaybe<Scalars['timestamptz']['input']>;
  contents?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  questionId?: InputMaybe<Scalars['String']['input']>;
  themeId?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "problem_answers" */
export enum Problem_Answers_Update_Column {
  /** column name */
  AcccountUserId = 'acccountUserId',
  /** column name */
  AiService = 'aiService',
  /** column name */
  AnswerDateTime = 'answerDateTime',
  /** column name */
  Contents = 'contents',
  /** column name */
  Id = 'id',
  /** column name */
  QuestionId = 'questionId',
  /** column name */
  ThemeId = 'themeId'
}

export type Problem_Answers_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Problem_Answers_Set_Input>;
  /** filter the rows which have to be updated */
  where: Problem_Answers_Bool_Exp;
};

/** columns and relationships of "problem_questions" */
export type Problem_Questions = {
  __typename?: 'problem_questions';
  acccountUserId: Scalars['String']['output'];
  /** An object relationship */
  account_user: Account_Users;
  contents: Scalars['String']['output'];
  createDateTime: Scalars['timestamptz']['output'];
  id: Scalars['String']['output'];
  /** An array relationship */
  problem_answers: Array<Problem_Answers>;
  /** An aggregate relationship */
  problem_answers_aggregate: Problem_Answers_Aggregate;
  /** An object relationship */
  problem_theme: Problem_Themes;
  themeId: Scalars['String']['output'];
};


/** columns and relationships of "problem_questions" */
export type Problem_QuestionsProblem_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Answers_Order_By>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};


/** columns and relationships of "problem_questions" */
export type Problem_QuestionsProblem_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Answers_Order_By>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};

/** aggregated selection of "problem_questions" */
export type Problem_Questions_Aggregate = {
  __typename?: 'problem_questions_aggregate';
  aggregate?: Maybe<Problem_Questions_Aggregate_Fields>;
  nodes: Array<Problem_Questions>;
};

export type Problem_Questions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Problem_Questions_Aggregate_Bool_Exp_Count>;
};

export type Problem_Questions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Problem_Questions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Problem_Questions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "problem_questions" */
export type Problem_Questions_Aggregate_Fields = {
  __typename?: 'problem_questions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Problem_Questions_Max_Fields>;
  min?: Maybe<Problem_Questions_Min_Fields>;
};


/** aggregate fields of "problem_questions" */
export type Problem_Questions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Problem_Questions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "problem_questions" */
export type Problem_Questions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Problem_Questions_Max_Order_By>;
  min?: InputMaybe<Problem_Questions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "problem_questions" */
export type Problem_Questions_Arr_Rel_Insert_Input = {
  data: Array<Problem_Questions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Problem_Questions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "problem_questions". All fields are combined with a logical 'AND'. */
export type Problem_Questions_Bool_Exp = {
  _and?: InputMaybe<Array<Problem_Questions_Bool_Exp>>;
  _not?: InputMaybe<Problem_Questions_Bool_Exp>;
  _or?: InputMaybe<Array<Problem_Questions_Bool_Exp>>;
  acccountUserId?: InputMaybe<String_Comparison_Exp>;
  account_user?: InputMaybe<Account_Users_Bool_Exp>;
  contents?: InputMaybe<String_Comparison_Exp>;
  createDateTime?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  problem_answers?: InputMaybe<Problem_Answers_Bool_Exp>;
  problem_answers_aggregate?: InputMaybe<Problem_Answers_Aggregate_Bool_Exp>;
  problem_theme?: InputMaybe<Problem_Themes_Bool_Exp>;
  themeId?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "problem_questions" */
export enum Problem_Questions_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProblemQuestionsPkey = 'problem_questions_pkey'
}

/** input type for inserting data into table "problem_questions" */
export type Problem_Questions_Insert_Input = {
  acccountUserId?: InputMaybe<Scalars['String']['input']>;
  account_user?: InputMaybe<Account_Users_Obj_Rel_Insert_Input>;
  contents?: InputMaybe<Scalars['String']['input']>;
  createDateTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  problem_answers?: InputMaybe<Problem_Answers_Arr_Rel_Insert_Input>;
  problem_theme?: InputMaybe<Problem_Themes_Obj_Rel_Insert_Input>;
  themeId?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Problem_Questions_Max_Fields = {
  __typename?: 'problem_questions_max_fields';
  acccountUserId?: Maybe<Scalars['String']['output']>;
  contents?: Maybe<Scalars['String']['output']>;
  createDateTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  themeId?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "problem_questions" */
export type Problem_Questions_Max_Order_By = {
  acccountUserId?: InputMaybe<Order_By>;
  contents?: InputMaybe<Order_By>;
  createDateTime?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  themeId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Problem_Questions_Min_Fields = {
  __typename?: 'problem_questions_min_fields';
  acccountUserId?: Maybe<Scalars['String']['output']>;
  contents?: Maybe<Scalars['String']['output']>;
  createDateTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  themeId?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "problem_questions" */
export type Problem_Questions_Min_Order_By = {
  acccountUserId?: InputMaybe<Order_By>;
  contents?: InputMaybe<Order_By>;
  createDateTime?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  themeId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "problem_questions" */
export type Problem_Questions_Mutation_Response = {
  __typename?: 'problem_questions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Problem_Questions>;
};

/** input type for inserting object relation for remote table "problem_questions" */
export type Problem_Questions_Obj_Rel_Insert_Input = {
  data: Problem_Questions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Problem_Questions_On_Conflict>;
};

/** on_conflict condition type for table "problem_questions" */
export type Problem_Questions_On_Conflict = {
  constraint: Problem_Questions_Constraint;
  update_columns?: Array<Problem_Questions_Update_Column>;
  where?: InputMaybe<Problem_Questions_Bool_Exp>;
};

/** Ordering options when selecting data from "problem_questions". */
export type Problem_Questions_Order_By = {
  acccountUserId?: InputMaybe<Order_By>;
  account_user?: InputMaybe<Account_Users_Order_By>;
  contents?: InputMaybe<Order_By>;
  createDateTime?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  problem_answers_aggregate?: InputMaybe<Problem_Answers_Aggregate_Order_By>;
  problem_theme?: InputMaybe<Problem_Themes_Order_By>;
  themeId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: problem_questions */
export type Problem_Questions_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "problem_questions" */
export enum Problem_Questions_Select_Column {
  /** column name */
  AcccountUserId = 'acccountUserId',
  /** column name */
  Contents = 'contents',
  /** column name */
  CreateDateTime = 'createDateTime',
  /** column name */
  Id = 'id',
  /** column name */
  ThemeId = 'themeId'
}

/** input type for updating data in table "problem_questions" */
export type Problem_Questions_Set_Input = {
  acccountUserId?: InputMaybe<Scalars['String']['input']>;
  contents?: InputMaybe<Scalars['String']['input']>;
  createDateTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  themeId?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "problem_questions" */
export type Problem_Questions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Problem_Questions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Problem_Questions_Stream_Cursor_Value_Input = {
  acccountUserId?: InputMaybe<Scalars['String']['input']>;
  contents?: InputMaybe<Scalars['String']['input']>;
  createDateTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  themeId?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "problem_questions" */
export enum Problem_Questions_Update_Column {
  /** column name */
  AcccountUserId = 'acccountUserId',
  /** column name */
  Contents = 'contents',
  /** column name */
  CreateDateTime = 'createDateTime',
  /** column name */
  Id = 'id',
  /** column name */
  ThemeId = 'themeId'
}

export type Problem_Questions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Problem_Questions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Problem_Questions_Bool_Exp;
};

/** columns and relationships of "problem_themes" */
export type Problem_Themes = {
  __typename?: 'problem_themes';
  accountUserId: Scalars['String']['output'];
  /** An object relationship */
  account_user: Account_Users;
  createDateTime: Scalars['timestamptz']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An array relationship */
  problem_answers: Array<Problem_Answers>;
  /** An aggregate relationship */
  problem_answers_aggregate: Problem_Answers_Aggregate;
  /** An array relationship */
  problem_questions: Array<Problem_Questions>;
  /** An aggregate relationship */
  problem_questions_aggregate: Problem_Questions_Aggregate;
  title: Scalars['String']['output'];
};


/** columns and relationships of "problem_themes" */
export type Problem_ThemesProblem_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Answers_Order_By>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};


/** columns and relationships of "problem_themes" */
export type Problem_ThemesProblem_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Answers_Order_By>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};


/** columns and relationships of "problem_themes" */
export type Problem_ThemesProblem_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Problem_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Questions_Order_By>>;
  where?: InputMaybe<Problem_Questions_Bool_Exp>;
};


/** columns and relationships of "problem_themes" */
export type Problem_ThemesProblem_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Questions_Order_By>>;
  where?: InputMaybe<Problem_Questions_Bool_Exp>;
};

/** aggregated selection of "problem_themes" */
export type Problem_Themes_Aggregate = {
  __typename?: 'problem_themes_aggregate';
  aggregate?: Maybe<Problem_Themes_Aggregate_Fields>;
  nodes: Array<Problem_Themes>;
};

export type Problem_Themes_Aggregate_Bool_Exp = {
  count?: InputMaybe<Problem_Themes_Aggregate_Bool_Exp_Count>;
};

export type Problem_Themes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Problem_Themes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Problem_Themes_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "problem_themes" */
export type Problem_Themes_Aggregate_Fields = {
  __typename?: 'problem_themes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Problem_Themes_Max_Fields>;
  min?: Maybe<Problem_Themes_Min_Fields>;
};


/** aggregate fields of "problem_themes" */
export type Problem_Themes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Problem_Themes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "problem_themes" */
export type Problem_Themes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Problem_Themes_Max_Order_By>;
  min?: InputMaybe<Problem_Themes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "problem_themes" */
export type Problem_Themes_Arr_Rel_Insert_Input = {
  data: Array<Problem_Themes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Problem_Themes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "problem_themes". All fields are combined with a logical 'AND'. */
export type Problem_Themes_Bool_Exp = {
  _and?: InputMaybe<Array<Problem_Themes_Bool_Exp>>;
  _not?: InputMaybe<Problem_Themes_Bool_Exp>;
  _or?: InputMaybe<Array<Problem_Themes_Bool_Exp>>;
  accountUserId?: InputMaybe<String_Comparison_Exp>;
  account_user?: InputMaybe<Account_Users_Bool_Exp>;
  createDateTime?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  problem_answers?: InputMaybe<Problem_Answers_Bool_Exp>;
  problem_answers_aggregate?: InputMaybe<Problem_Answers_Aggregate_Bool_Exp>;
  problem_questions?: InputMaybe<Problem_Questions_Bool_Exp>;
  problem_questions_aggregate?: InputMaybe<Problem_Questions_Aggregate_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "problem_themes" */
export enum Problem_Themes_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProblemThemesPkey = 'problem_themes_pkey'
}

/** input type for inserting data into table "problem_themes" */
export type Problem_Themes_Insert_Input = {
  accountUserId?: InputMaybe<Scalars['String']['input']>;
  account_user?: InputMaybe<Account_Users_Obj_Rel_Insert_Input>;
  createDateTime?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  problem_answers?: InputMaybe<Problem_Answers_Arr_Rel_Insert_Input>;
  problem_questions?: InputMaybe<Problem_Questions_Arr_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Problem_Themes_Max_Fields = {
  __typename?: 'problem_themes_max_fields';
  accountUserId?: Maybe<Scalars['String']['output']>;
  createDateTime?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "problem_themes" */
export type Problem_Themes_Max_Order_By = {
  accountUserId?: InputMaybe<Order_By>;
  createDateTime?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Problem_Themes_Min_Fields = {
  __typename?: 'problem_themes_min_fields';
  accountUserId?: Maybe<Scalars['String']['output']>;
  createDateTime?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "problem_themes" */
export type Problem_Themes_Min_Order_By = {
  accountUserId?: InputMaybe<Order_By>;
  createDateTime?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "problem_themes" */
export type Problem_Themes_Mutation_Response = {
  __typename?: 'problem_themes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Problem_Themes>;
};

/** input type for inserting object relation for remote table "problem_themes" */
export type Problem_Themes_Obj_Rel_Insert_Input = {
  data: Problem_Themes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Problem_Themes_On_Conflict>;
};

/** on_conflict condition type for table "problem_themes" */
export type Problem_Themes_On_Conflict = {
  constraint: Problem_Themes_Constraint;
  update_columns?: Array<Problem_Themes_Update_Column>;
  where?: InputMaybe<Problem_Themes_Bool_Exp>;
};

/** Ordering options when selecting data from "problem_themes". */
export type Problem_Themes_Order_By = {
  accountUserId?: InputMaybe<Order_By>;
  account_user?: InputMaybe<Account_Users_Order_By>;
  createDateTime?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  problem_answers_aggregate?: InputMaybe<Problem_Answers_Aggregate_Order_By>;
  problem_questions_aggregate?: InputMaybe<Problem_Questions_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: problem_themes */
export type Problem_Themes_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "problem_themes" */
export enum Problem_Themes_Select_Column {
  /** column name */
  AccountUserId = 'accountUserId',
  /** column name */
  CreateDateTime = 'createDateTime',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "problem_themes" */
export type Problem_Themes_Set_Input = {
  accountUserId?: InputMaybe<Scalars['String']['input']>;
  createDateTime?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "problem_themes" */
export type Problem_Themes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Problem_Themes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Problem_Themes_Stream_Cursor_Value_Input = {
  accountUserId?: InputMaybe<Scalars['String']['input']>;
  createDateTime?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "problem_themes" */
export enum Problem_Themes_Update_Column {
  /** column name */
  AccountUserId = 'accountUserId',
  /** column name */
  CreateDateTime = 'createDateTime',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title'
}

export type Problem_Themes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Problem_Themes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Problem_Themes_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "account_users" */
  account_users: Array<Account_Users>;
  /** fetch aggregated fields from the table: "account_users" */
  account_users_aggregate: Account_Users_Aggregate;
  /** fetch data from the table: "account_users" using primary key columns */
  account_users_by_pk?: Maybe<Account_Users>;
  /** An array relationship */
  problem_answers: Array<Problem_Answers>;
  /** An aggregate relationship */
  problem_answers_aggregate: Problem_Answers_Aggregate;
  /** fetch data from the table: "problem_answers" using primary key columns */
  problem_answers_by_pk?: Maybe<Problem_Answers>;
  /** An array relationship */
  problem_questions: Array<Problem_Questions>;
  /** An aggregate relationship */
  problem_questions_aggregate: Problem_Questions_Aggregate;
  /** fetch data from the table: "problem_questions" using primary key columns */
  problem_questions_by_pk?: Maybe<Problem_Questions>;
  /** An array relationship */
  problem_themes: Array<Problem_Themes>;
  /** An aggregate relationship */
  problem_themes_aggregate: Problem_Themes_Aggregate;
  /** fetch data from the table: "problem_themes" using primary key columns */
  problem_themes_by_pk?: Maybe<Problem_Themes>;
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


export type Query_RootProblem_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Answers_Order_By>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};


export type Query_RootProblem_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Answers_Order_By>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};


export type Query_RootProblem_Answers_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootProblem_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Problem_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Questions_Order_By>>;
  where?: InputMaybe<Problem_Questions_Bool_Exp>;
};


export type Query_RootProblem_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Questions_Order_By>>;
  where?: InputMaybe<Problem_Questions_Bool_Exp>;
};


export type Query_RootProblem_Questions_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootProblem_ThemesArgs = {
  distinct_on?: InputMaybe<Array<Problem_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Themes_Order_By>>;
  where?: InputMaybe<Problem_Themes_Bool_Exp>;
};


export type Query_RootProblem_Themes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Themes_Order_By>>;
  where?: InputMaybe<Problem_Themes_Bool_Exp>;
};


export type Query_RootProblem_Themes_By_PkArgs = {
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
  /** An array relationship */
  problem_answers: Array<Problem_Answers>;
  /** An aggregate relationship */
  problem_answers_aggregate: Problem_Answers_Aggregate;
  /** fetch data from the table: "problem_answers" using primary key columns */
  problem_answers_by_pk?: Maybe<Problem_Answers>;
  /** fetch data from the table in a streaming manner: "problem_answers" */
  problem_answers_stream: Array<Problem_Answers>;
  /** An array relationship */
  problem_questions: Array<Problem_Questions>;
  /** An aggregate relationship */
  problem_questions_aggregate: Problem_Questions_Aggregate;
  /** fetch data from the table: "problem_questions" using primary key columns */
  problem_questions_by_pk?: Maybe<Problem_Questions>;
  /** fetch data from the table in a streaming manner: "problem_questions" */
  problem_questions_stream: Array<Problem_Questions>;
  /** An array relationship */
  problem_themes: Array<Problem_Themes>;
  /** An aggregate relationship */
  problem_themes_aggregate: Problem_Themes_Aggregate;
  /** fetch data from the table: "problem_themes" using primary key columns */
  problem_themes_by_pk?: Maybe<Problem_Themes>;
  /** fetch data from the table in a streaming manner: "problem_themes" */
  problem_themes_stream: Array<Problem_Themes>;
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


export type Subscription_RootProblem_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Answers_Order_By>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};


export type Subscription_RootProblem_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Answers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Answers_Order_By>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};


export type Subscription_RootProblem_Answers_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootProblem_Answers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Problem_Answers_Stream_Cursor_Input>>;
  where?: InputMaybe<Problem_Answers_Bool_Exp>;
};


export type Subscription_RootProblem_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Problem_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Questions_Order_By>>;
  where?: InputMaybe<Problem_Questions_Bool_Exp>;
};


export type Subscription_RootProblem_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Questions_Order_By>>;
  where?: InputMaybe<Problem_Questions_Bool_Exp>;
};


export type Subscription_RootProblem_Questions_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootProblem_Questions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Problem_Questions_Stream_Cursor_Input>>;
  where?: InputMaybe<Problem_Questions_Bool_Exp>;
};


export type Subscription_RootProblem_ThemesArgs = {
  distinct_on?: InputMaybe<Array<Problem_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Themes_Order_By>>;
  where?: InputMaybe<Problem_Themes_Bool_Exp>;
};


export type Subscription_RootProblem_Themes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Problem_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Problem_Themes_Order_By>>;
  where?: InputMaybe<Problem_Themes_Bool_Exp>;
};


export type Subscription_RootProblem_Themes_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootProblem_Themes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Problem_Themes_Stream_Cursor_Input>>;
  where?: InputMaybe<Problem_Themes_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

export type AccountUsersByGmailQueryVariables = Exact<{
  gmail: Scalars['String']['input'];
}>;


export type AccountUsersByGmailQuery = { __typename?: 'query_root', account_users: Array<{ __typename?: 'account_users', id: string, userSettingId: string, name: string, imageUrl?: string | null }> };

export type AccountUsersByUserSettingIdQueryVariables = Exact<{
  userSettingId: Scalars['String']['input'];
}>;


export type AccountUsersByUserSettingIdQuery = { __typename?: 'query_root', account_users: Array<{ __typename?: 'account_users', id: string }> };

export type AddAccountUserByGmailMutationVariables = Exact<{
  id: Scalars['String']['input'];
  userSettingId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  gmail: Scalars['String']['input'];
}>;


export type AddAccountUserByGmailMutation = { __typename?: 'mutation_root', insert_account_users_one?: { __typename?: 'account_users', id: string } | null };

export type AddThemeAndQuestionMutationVariables = Exact<{
  themeTitle: Scalars['String']['input'];
  themeDescription?: InputMaybe<Scalars['String']['input']>;
  question: Scalars['String']['input'];
}>;


export type AddThemeAndQuestionMutation = { __typename?: 'mutation_root', insert_problem_themes_one?: { __typename?: 'problem_themes', id: string } | null };

export type AddThemeMutationVariables = Exact<{
  themeTitle: Scalars['String']['input'];
  themeDescription?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddThemeMutation = { __typename?: 'mutation_root', insert_problem_themes_one?: { __typename?: 'problem_themes', id: string } | null };

export type GetThemeByIdDocumentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetThemeByIdDocumentQuery = { __typename?: 'query_root', problem_themes: Array<{ __typename?: 'problem_themes', id: string, title: string, description?: string | null, problem_questions: Array<{ __typename?: 'problem_questions', id: string, contents: string }> }> };


export const AccountUsersByGmailDocument = gql`
    query AccountUsersByGmail($gmail: String!) {
  account_users(where: {gmail: {_eq: $gmail}}) {
    id
    userSettingId
    name
    imageUrl
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
export const AccountUsersByUserSettingIdDocument = gql`
    query AccountUsersByUserSettingId($userSettingId: String!) {
  account_users(where: {userSettingId: {_eq: $userSettingId}}) {
    id
  }
}
    `;

/**
 * __useAccountUsersByUserSettingIdQuery__
 *
 * To run a query within a React component, call `useAccountUsersByUserSettingIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountUsersByUserSettingIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountUsersByUserSettingIdQuery({
 *   variables: {
 *      userSettingId: // value for 'userSettingId'
 *   },
 * });
 */
export function useAccountUsersByUserSettingIdQuery(baseOptions: Apollo.QueryHookOptions<AccountUsersByUserSettingIdQuery, AccountUsersByUserSettingIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountUsersByUserSettingIdQuery, AccountUsersByUserSettingIdQueryVariables>(AccountUsersByUserSettingIdDocument, options);
      }
export function useAccountUsersByUserSettingIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountUsersByUserSettingIdQuery, AccountUsersByUserSettingIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountUsersByUserSettingIdQuery, AccountUsersByUserSettingIdQueryVariables>(AccountUsersByUserSettingIdDocument, options);
        }
export function useAccountUsersByUserSettingIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountUsersByUserSettingIdQuery, AccountUsersByUserSettingIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountUsersByUserSettingIdQuery, AccountUsersByUserSettingIdQueryVariables>(AccountUsersByUserSettingIdDocument, options);
        }
export type AccountUsersByUserSettingIdQueryHookResult = ReturnType<typeof useAccountUsersByUserSettingIdQuery>;
export type AccountUsersByUserSettingIdLazyQueryHookResult = ReturnType<typeof useAccountUsersByUserSettingIdLazyQuery>;
export type AccountUsersByUserSettingIdSuspenseQueryHookResult = ReturnType<typeof useAccountUsersByUserSettingIdSuspenseQuery>;
export type AccountUsersByUserSettingIdQueryResult = Apollo.QueryResult<AccountUsersByUserSettingIdQuery, AccountUsersByUserSettingIdQueryVariables>;
export const AddAccountUserByGmailDocument = gql`
    mutation AddAccountUserByGmail($id: String!, $userSettingId: String!, $name: String!, $gmail: String!) {
  insert_account_users_one(
    object: {id: $id, userSettingId: $userSettingId, name: $name, gmail: $gmail}
  ) {
    id
  }
}
    `;
export type AddAccountUserByGmailMutationFn = Apollo.MutationFunction<AddAccountUserByGmailMutation, AddAccountUserByGmailMutationVariables>;

/**
 * __useAddAccountUserByGmailMutation__
 *
 * To run a mutation, you first call `useAddAccountUserByGmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAccountUserByGmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAccountUserByGmailMutation, { data, loading, error }] = useAddAccountUserByGmailMutation({
 *   variables: {
 *      id: // value for 'id'
 *      userSettingId: // value for 'userSettingId'
 *      name: // value for 'name'
 *      gmail: // value for 'gmail'
 *   },
 * });
 */
export function useAddAccountUserByGmailMutation(baseOptions?: Apollo.MutationHookOptions<AddAccountUserByGmailMutation, AddAccountUserByGmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAccountUserByGmailMutation, AddAccountUserByGmailMutationVariables>(AddAccountUserByGmailDocument, options);
      }
export type AddAccountUserByGmailMutationHookResult = ReturnType<typeof useAddAccountUserByGmailMutation>;
export type AddAccountUserByGmailMutationResult = Apollo.MutationResult<AddAccountUserByGmailMutation>;
export type AddAccountUserByGmailMutationOptions = Apollo.BaseMutationOptions<AddAccountUserByGmailMutation, AddAccountUserByGmailMutationVariables>;
export const AddThemeAndQuestionDocument = gql`
    mutation AddThemeAndQuestion($themeTitle: String!, $themeDescription: String, $question: String!) {
  insert_problem_themes_one(
    object: {title: $themeTitle, description: $themeDescription, problem_questions: {data: {contents: $question}}}
  ) {
    id
  }
}
    `;
export type AddThemeAndQuestionMutationFn = Apollo.MutationFunction<AddThemeAndQuestionMutation, AddThemeAndQuestionMutationVariables>;

/**
 * __useAddThemeAndQuestionMutation__
 *
 * To run a mutation, you first call `useAddThemeAndQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddThemeAndQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addThemeAndQuestionMutation, { data, loading, error }] = useAddThemeAndQuestionMutation({
 *   variables: {
 *      themeTitle: // value for 'themeTitle'
 *      themeDescription: // value for 'themeDescription'
 *      question: // value for 'question'
 *   },
 * });
 */
export function useAddThemeAndQuestionMutation(baseOptions?: Apollo.MutationHookOptions<AddThemeAndQuestionMutation, AddThemeAndQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddThemeAndQuestionMutation, AddThemeAndQuestionMutationVariables>(AddThemeAndQuestionDocument, options);
      }
export type AddThemeAndQuestionMutationHookResult = ReturnType<typeof useAddThemeAndQuestionMutation>;
export type AddThemeAndQuestionMutationResult = Apollo.MutationResult<AddThemeAndQuestionMutation>;
export type AddThemeAndQuestionMutationOptions = Apollo.BaseMutationOptions<AddThemeAndQuestionMutation, AddThemeAndQuestionMutationVariables>;
export const AddThemeDocument = gql`
    mutation AddTheme($themeTitle: String!, $themeDescription: String) {
  insert_problem_themes_one(
    object: {title: $themeTitle, description: $themeDescription}
  ) {
    id
  }
}
    `;
export type AddThemeMutationFn = Apollo.MutationFunction<AddThemeMutation, AddThemeMutationVariables>;

/**
 * __useAddThemeMutation__
 *
 * To run a mutation, you first call `useAddThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addThemeMutation, { data, loading, error }] = useAddThemeMutation({
 *   variables: {
 *      themeTitle: // value for 'themeTitle'
 *      themeDescription: // value for 'themeDescription'
 *   },
 * });
 */
export function useAddThemeMutation(baseOptions?: Apollo.MutationHookOptions<AddThemeMutation, AddThemeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddThemeMutation, AddThemeMutationVariables>(AddThemeDocument, options);
      }
export type AddThemeMutationHookResult = ReturnType<typeof useAddThemeMutation>;
export type AddThemeMutationResult = Apollo.MutationResult<AddThemeMutation>;
export type AddThemeMutationOptions = Apollo.BaseMutationOptions<AddThemeMutation, AddThemeMutationVariables>;
export const GetThemeByIdDocumentDocument = gql`
    query GetThemeByIdDocument($id: String!) {
  problem_themes(where: {id: {_eq: $id}}) {
    id
    title
    description
    problem_questions(order_by: {createDateTime: desc}) {
      id
      contents
    }
  }
}
    `;

/**
 * __useGetThemeByIdDocumentQuery__
 *
 * To run a query within a React component, call `useGetThemeByIdDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThemeByIdDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThemeByIdDocumentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetThemeByIdDocumentQuery(baseOptions: Apollo.QueryHookOptions<GetThemeByIdDocumentQuery, GetThemeByIdDocumentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThemeByIdDocumentQuery, GetThemeByIdDocumentQueryVariables>(GetThemeByIdDocumentDocument, options);
      }
export function useGetThemeByIdDocumentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThemeByIdDocumentQuery, GetThemeByIdDocumentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThemeByIdDocumentQuery, GetThemeByIdDocumentQueryVariables>(GetThemeByIdDocumentDocument, options);
        }
export function useGetThemeByIdDocumentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetThemeByIdDocumentQuery, GetThemeByIdDocumentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetThemeByIdDocumentQuery, GetThemeByIdDocumentQueryVariables>(GetThemeByIdDocumentDocument, options);
        }
export type GetThemeByIdDocumentQueryHookResult = ReturnType<typeof useGetThemeByIdDocumentQuery>;
export type GetThemeByIdDocumentLazyQueryHookResult = ReturnType<typeof useGetThemeByIdDocumentLazyQuery>;
export type GetThemeByIdDocumentSuspenseQueryHookResult = ReturnType<typeof useGetThemeByIdDocumentSuspenseQuery>;
export type GetThemeByIdDocumentQueryResult = Apollo.QueryResult<GetThemeByIdDocumentQuery, GetThemeByIdDocumentQueryVariables>;