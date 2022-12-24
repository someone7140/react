import Router from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import LoadingComponent from "../common/LoadingComponent";
import DescriptionInputComponent from "./input/DescriptionInputComponent";
import GitHubIdInputComponent from "./input/GitHubIdInputComponent";
import IconImageInputComponent from "./input/IconImageInputComponent";
import InstagramIdInputComponent from "./input/InstagramIdInputComponent";
import IsAccountOpenInputComponent from "./input/IsAccountOpenInputComponent";
import OccupationInputComponent from "./input/OccupationInputComponent";
import TwitterUserNameInputComponent from "./input/TwitterUserNameInputComponent";
import UserIdInputComponent from "./input/UserIdInputComponent";
import UserNameInputComponent from "./input/UserNameInputComponent";
import { useMutateApi } from "../../services/api/ApiHooksService";
import {
  editUserAccount,
  registerUserAccount,
} from "../../services/api/userAccount/ApiUserAccountService";
import { setAuthTokenToLocalStorage } from "../../services/localStorage/AccountAuthService";
import { useSharedState } from "../../services/state/StateService";

export default function UserAccountInputComponent(prop) {
  const initialData = prop.initialData;
  const editFlag = prop.initialData?.token ? true : false;
  const { execPostApi, isLoading } = useMutateApi();
  const { setSharedState: setLoginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  const { register, handleSubmit, formState, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      userId: initialData.userId,
      name: initialData.name,
      isAccountOpen:
        initialData.isAccountOpen || initialData.isAccountOpen === undefined
          ? "true"
          : "false",
      occupation: initialData.occupation,
      description: initialData.description,
      twitterUserName: initialData.twitterUserName,
      instagramId: initialData.instagramId,
      gitHubId: initialData.gitHubId,
    },
  });

  function isEnableSubmit() {
    return formState.isValid && !isLoading;
  }

  async function registerUserAccountInfo(data) {
    const result = await execPostApi({
      apiPath: "userAccount/registerUserAccount",
      execPost: function () {
        if (editFlag) {
          return editUserAccount(
            prop.initialData.token,
            data.userId,
            data.name,
            data.isAccountOpen,
            data.occupation,
            data.description,
            data.twitterUserName,
            data.instagramId,
            data.gitHubId,
            initialData.googleToken,
            initialData.twitterToken,
            initialData.emailToken,
            data.iconImage
          );
        } else {
          return registerUserAccount(
            data.userId,
            data.name,
            data.isAccountOpen,
            data.occupation,
            data.description,
            data.twitterUserName,
            data.instagramId,
            data.gitHubId,
            initialData.googleToken,
            initialData.twitterToken,
            initialData.emailToken,
            data.iconImage
          );
        }
      },
    });
    if (result?.status == 200) {
      if (!editFlag) {
        setAuthTokenToLocalStorage(result.data.token);
        setLoginAuthSharedState(result.data);
      } else {
        if (result.data.iconImageUrl) {
          // 画像のキャッシュ対策用に現在時刻をURLに付与
          setLoginAuthSharedState({
            ...result.data,
            iconImageUrl: result.data.iconImageUrl + "?" + Date.now(),
          });
        } else {
          setLoginAuthSharedState(result.data);
        }
      }
      toast.success("会員情報を登録しました", {
        duration: 3000,
      });
      Router.push("/");
    } else if (result?.status == 400) {
      toast.error("既に登録済みのユーザIDです", {
        duration: 3000,
      });
    } else {
      toast.error("登録時にエラーが発生しました", {
        duration: 3000,
      });
    }
  }

  return (
    <form
      className="w-screen flex justify-center items-center flex-col"
      onSubmit={handleSubmit(registerUserAccountInfo)}
    >
      <div className="mb-4">
        <UserIdInputComponent register={register} errors={formState.errors} />
      </div>
      <div className="mb-4">
        <UserNameInputComponent register={register} errors={formState.errors} />
      </div>
      <div className="mb-4">
        <IsAccountOpenInputComponent
          register={register}
          errors={formState.errors}
        />
      </div>
      <div className="mb-4">
        <OccupationInputComponent register={register} />
      </div>
      <div className="mb-4">
        <DescriptionInputComponent register={register} />
      </div>
      <div className="mb-4">
        <IconImageInputComponent
          setValue={setValue}
          initialSrc={initialData.iconImageUrl}
        />
      </div>
      <div className="mb-4">
        <TwitterUserNameInputComponent register={register} />
      </div>
      <div className="mb-4">
        <InstagramIdInputComponent register={register} />
      </div>
      <div className="mb-6">
        <GitHubIdInputComponent register={register} />
      </div>
      <button
        className={
          isEnableSubmit()
            ? "bg-blue-300 rounded px-4 py-2 border border-neutral-300"
            : "bg-gray-300 rounded px-4 py-2 border border-neutral-300"
        }
        disabled={!isEnableSubmit()}
      >
        {editFlag ? <>会員情報編集</> : <>会員登録</>}
      </button>
      {isLoading && (
        <div className="w-8 h-8 mt-2">
          <LoadingComponent />
        </div>
      )}
    </form>
  );
}
