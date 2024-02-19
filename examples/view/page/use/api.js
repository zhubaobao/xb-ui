export const tableApi = (params) => {
  return new Promise((resolve) => {
    let data = [
      {
        id: 3328725527387380,
        category: {
          id: 910025,
          name: "人电",
        },
        name: "质林公",
        photoUrls: "http://dummyimage.com/400x400",
        tags: [
          {
            id: 59652610,
            name: "道此有面",
          },
        ],
        startTime: "2024-02-02 00:00:00",
        endTime: "2024-03-01 00:00:00",
        status: "available",
      },
      {
        id: 4481681415729684,
        category: {
          id: 10890917,
          name: "分听",
        },
        name: "有少天",
        photoUrls: "http://dummyimage.com/400x400",
        tags: [
          {
            name: "级金走公",
            id: 38634272,
          },
          {
            id: 61905151,
            name: "合到高争",
          },
          {
            id: 47000302,
            name: "家图指程",
          },
          {
            id: 96135805,
            name: "劳属适便",
          },
          {
            name: "间机严段",
            id: 9020929,
          },
        ],
        status: "sold",
      },
      {
        id: 5203727729784708,
        category: {
          id: 99405423,
          name: "周有",
        },
        name: "有或动",
        photoUrls: "http://dummyimage.com/400x400",
        tags: [
          {
            name: "报压术政",
            id: 98364536,
          },
          {
            id: 54103941,
            name: "元名备民",
          },
          {
            id: 31732878,
            name: "来经院近",
          },
          {
            id: 98090281,
            name: "委持世信",
          },
        ],
        status: "sold",
      },
      {
        id: 1198853500813374,
        category: {
          name: "合几",
          id: 13055998,
        },
        name: "目前整",
        photoUrls: "http://dummyimage.com/400x400",
        tags: [
          {
            name: "明不料样",
            id: 29870921,
          },
          {
            name: "结不情此",
            id: 91272282,
          },
          {
            name: "美所有并",
            id: 1950209,
          },
          {
            id: 6268433,
            name: "准行采信",
          },
        ],
        status: "pending",
      },
      {
        id: 5057198382895518,
        category: {
          name: "马工",
          id: 73738446,
        },
        name: "速候马",
        photoUrls: "http://dummyimage.com/400x400",
        tags: [
          {
            id: 92581969,
            name: "交况图感",
          },
          {
            name: "相共改区",
            id: 57363838,
          },
          {
            id: 96900480,
            name: "求布酸将",
          },
        ],
        status: "available",
      },
      {
        id: 5916813992637880,
        category: {
          name: "际世",
          id: 43808296,
        },
        name: "处包就",
        photoUrls: "http://dummyimage.com/400x400",
        tags: [
          {
            name: "定高果领",
            id: 70544677,
          },
        ],
        status: "pending",
      },
      {
        id: 8253240308030432,
        category: {
          id: 42500418,
          name: "口子",
        },
        name: "步常技",
        photoUrls: "http://dummyimage.com/400x400",
        tags: [
          {
            name: "史进千二",
            id: 50639062,
          },
          {
            name: "始子头亲",
            id: 1640446,
          },
          {
            name: "各质之或",
            id: 30062511,
          },
          {
            name: "反二放走",
            id: 7915769,
          },
        ],
        status: "sold",
      },
    ];
    data = data.filter((item) => {
      return (
        (item.name == params.name || !params.name) &&
        (item.status == params.status || !params.status)
      );
    });
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          data: data
        },
      });
    }, 1000);
  });
};
