import axios from "axios";

// 直近のannouncementを取得
export async function getRecentAnnouncements() {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/announcement/getRecentAnnouncements`,
      {
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// id指定でannouncementを追加
export async function getAnnouncementById(id) {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/announcement/getAnnouncementById?id=${id}`,
      {
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// announcementを追加
export async function createAnnouncement(authToken, title, announcementHtml) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/announcement/addAnnouncement`,
      { title: title, announcementHtml: announcementHtml },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      }
    );
    return { status: 200 };
  } catch (e) {
    return { status: e.response.status };
  }
}

// announcementを編集
export async function editAnnouncement(authToken, id, title, announcementHtml) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/announcement/editAnnouncement`,
      { id: id, title: title, announcementHtml: announcementHtml },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      }
    );
    return { status: 200 };
  } catch (e) {
    return { status: e.response.status };
  }
}

// announcementを削除
export async function deleteAnnouncement(authToken, id) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/announcement/deleteAnnouncement`,
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      }
    );
    return { status: 200 };
  } catch (e) {
    return { status: e.response.status };
  }
}
