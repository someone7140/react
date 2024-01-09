import {
  AccountUsersByGmailDocument,
  AccountUsersByGmailQuery,
  AccountUsersByGmailQueryVariables,
  AccountUsersByUserSettingIdDocument,
  AccountUsersByUserSettingIdQuery,
  AccountUsersByUserSettingIdQueryVariables,
  AddAccountUserByGmailDocument,
  AddAccountUserByGmailMutation,
  AddAccountUserByGmailMutationVariables,
} from "@/query/graphqlGen/graphql";
import { getHasuraClient } from "@/restHandler/externalApi/hasuraClient";

export const gmailRegisteredCheck = async (gmail: string) => {
  const queryVariables: AccountUsersByGmailQueryVariables = { gmail };
  const { data: queryData } =
    await getHasuraClient().query<AccountUsersByGmailQuery>({
      query: AccountUsersByGmailDocument,
      variables: queryVariables,
    });

  return queryData?.account_users?.length > 0 ?? false;
};

export const userSettingIdRegisteredCheck = async (userSettingId: string) => {
  const queryVariables: AccountUsersByUserSettingIdQueryVariables = {
    userSettingId,
  };
  const { data: queryData } =
    await getHasuraClient().query<AccountUsersByUserSettingIdQuery>({
      query: AccountUsersByUserSettingIdDocument,
      variables: queryVariables,
    });

  return queryData?.account_users?.length > 0 ?? false;
};

export const addAccountUserByGmail = async (
  id: string,
  userSettingId: string,
  name: string,
  gmail: string
) => {
  const mutationVariables: AddAccountUserByGmailMutationVariables = {
    id,
    userSettingId,
    name,
    gmail,
  };
  await getHasuraClient().mutate<AddAccountUserByGmailMutation>({
    mutation: AddAccountUserByGmailDocument,
    variables: mutationVariables,
  });
};
