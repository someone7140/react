import Link from "next/link";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import LoadingComponent from "../common/LoadingComponent";
import { getOpenUserList } from "../../services/api/userAccount/ApiUserAccountService";
import { getDisplayDateMinuteUnit } from "../../services/date/DateService";

export default function OpenUserAccountListComponent() {
  const { data: openUsers } = useSWR(
    "/userAccount/getOpenUserList",
    async () => {
      const result = await getOpenUserList();
      if (result.status != 200) {
        toast.error("ユーザの取得に失敗しました", {
          duration: 3000,
        });
        return [];
      } else {
        return result.data;
      }
    }
  );
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="font-bold">【公開ユーザー】</div>
      {openUsers && (
        <>
          {openUsers.length > 0 && (
            <>
              {openUsers.map((user) => (
                <div className="mt-2 bg-white border-2 border-black-800 rounded-lg shadow w-[370px]">
                  <div className="flex flex-row container">
                    <div className="ml-1 mt-3">
                      {user.iconImageUrl && (
                        <img src={user.iconImageUrl} className="w-12 h-12" />
                      )}
                      {!user.iconImageUrl && (
                        <FontAwesomeIcon icon={faUser} className="w-12 h-12" />
                      )}
                    </div>
                    <div className="ml-2">
                      <div className="font-bold break-all text-lg">
                        {user.name}
                      </div>
                      <div>{user.occupation}</div>
                      <div className="break-all whitespace-pre">
                        {user.description}
                      </div>
                      <div className="break-all whitespace-pre">
                        {user.description}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <Link href={`/account/account_ref?id=${user.userId}`}>
                      <button
                        className={
                          "bg-blue-300 rounded px-4 py-2 border border-neutral-300"
                        }
                      >
                        履歴の詳細
                      </button>
                    </Link>
                  </div>
                  <div className="mr-1 mt-2 text-right">
                    登録日:{getDisplayDateMinuteUnit(user.createdAt)}
                  </div>
                </div>
              ))}
            </>
          )}
          {openUsers.length == 0 && (
            <div className="mt-2">公開ユーザはいません</div>
          )}
        </>
      )}
      {!openUsers && (
        <div className="w-8 h-8 mt-2">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
}
