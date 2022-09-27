<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : "未分類" }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link :to="{name: 'admin-restaurant', params: {id: restaurant.id}}" class="btn btn-link">
          Show
        </router-link>

          <router-link :to="{name:'admin-restaurant-edit',params:{id: restaurant.id}}" class="btn btn-link">Edit</router-link>

          <button @click.stop.prevent="deleteRestaurant(restaurant.id)" type="button" class="btn btn-link">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const dummyData = {
  restaurants: [
    {
      id: 4,
      name: "Sonia Kassulke",
      tel: "(940) 425-9551",
      address: "698 Schowalter Lodge",
      opening_hours: "08:00",
      description:
        "Et officiis sapiente voluptatem omnis dolor dignissimos et expedita laudantium.\nNulla laboriosam sunt ullam.\nCorporis blanditiis quia aspernatur.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=3.8704297568656676",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 5,
      name: "Hailee Deckow",
      tel: "1-955-550-3318 x4259",
      address: "722 Omer Walks",
      opening_hours: "08:00",
      description: "beatae eos quia",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=21.741130713126488",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 10,
      name: "Marley Bernhard",
      tel: "018-657-6776 x0155",
      address: "218 Beahan Trail",
      opening_hours: "08:00",
      description: "Numquam eum quia itaque.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=6.7426668352599695",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 20,
      name: "Gino Farrell II",
      tel: "183.462.7809",
      address: "6102 Schoen Square",
      opening_hours: "08:00",
      description: "Eos non provident aliquid suscipit.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=53.22119102025562",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 22,
      name: "Easton Abshire",
      tel: "(959) 477-5890 x931",
      address: "1512 Tristian Club",
      opening_hours: "08:00",
      description:
        "Optio et eaque enim odit ad id delectus incidunt. Asperiores id autem nostrum optio ut. Ab assumenda pariatur et numquam et totam.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=13.02755862503695",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 40,
      name: "Mikel Schiller",
      tel: "(146) 566-2406",
      address: "85904 Norma Motorway",
      opening_hours: "08:00",
      description:
        "Earum sunt voluptatem. Aspernatur enim necessitatibus. Dolorum natus molestiae reprehenderit consequatur aliquam excepturi numquam. Non voluptatem esse nulla hic itaque quis.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=19.964600313406766",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 45,
      name: "Roselyn O'Hara",
      tel: "1-753-948-3866",
      address: "7423 Otilia Creek",
      opening_hours: "08:00",
      description: "illum animi et",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=42.86267620747586",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 46,
      name: "Loma Rodriguez",
      tel: "920.646.7695 x91716",
      address: "249 Olin Fork",
      opening_hours: "08:00",
      description: "qui",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=63.68373451877676",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 14,
      name: "Gunner Terry",
      tel: "876-394-5471 x3081",
      address: "455 Sebastian Meadow",
      opening_hours: "08:00",
      description:
        "Magni earum labore ut impedit et inventore corrupti voluptatum laudantium. Doloribus deserunt nulla vel asperiores sed nam. Omnis reprehenderit rerum aut. Unde eveniet ipsum.\n \rQuis voluptas cumque. Provident laudantium fuga et est in quo eius numquam. Repellendus nam facilis. Fuga incidunt expedita et adipisci quia velit aut.\n \rRecusandae enim quasi repudiandae numquam sapiente pariatur laborum molestiae sint. Aut in et et nemo iste dolores et. Quidem sit autem accusantium voluptates. Maiores sint eum corrupti rerum dignissimos consequatur voluptatem. Perspiciatis voluptas quasi similique ut dolorum. Dicta quasi quasi delectus quia necessitatibus adipisci minus.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=99.26121653502989",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 24,
      name: "Pearl Gibson MD",
      tel: "142.326.2449",
      address: "072 O'Kon Mill",
      opening_hours: "08:00",
      description: "autem est nulla",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=5.225894791567631",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 27,
      name: "Janis Larson",
      tel: "(940) 142-3837",
      address: "244 Mack Stream",
      opening_hours: "08:00",
      description: "Qui est suscipit et vel est odit ea rerum.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=96.214738945509",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 30,
      name: "Alex Waelchi",
      tel: "371-062-2938 x0043",
      address: "672 Lela Turnpike",
      opening_hours: "08:00",
      description: "Quis delectus placeat nostrum.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=67.19016725711977",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 34,
      name: "Amari Abbott",
      tel: "264-681-2229",
      address: "94231 Wisozk Burg",
      opening_hours: "08:00",
      description:
        "Molestias et pariatur. Est et incidunt quo optio nulla libero eaque. Molestiae temporibus dignissimos omnis laboriosam dolore quos sit.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=25.698603845268032",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 35,
      name: "Jaron Vandervort",
      tel: "(445) 496-0644 x110",
      address: "35851 Johns Knolls",
      opening_hours: "08:00",
      description:
        "A ut quia sed. Pariatur voluptatem voluptatem excepturi aut. Et corporis cum deserunt id ipsam consequatur enim. Est reprehenderit et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=81.30584744910682",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 36,
      name: "Elza Doyle",
      tel: "038.645.5780",
      address: "2544 Jast Port",
      opening_hours: "08:00",
      description:
        "Facilis temporibus aliquid ut eius vel nulla et.\nQui saepe officia necessitatibus voluptates voluptate harum aspernatur voluptatem.\nNatus ipsum quas.\nQuasi a inventore ratione repudiandae rerum qui.\nQui est porro consequatur esse ullam et temporibus hic.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=15.004238543699543",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 41,
      name: "Adam Mayert MD",
      tel: "1-825-260-0616",
      address: "351 Bailey Drive",
      opening_hours: "08:00",
      description: "enim",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=49.946717785460315",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 43,
      name: "Alfreda Dietrich",
      tel: "1-749-826-6863 x0247",
      address: "06055 Simonis Burg",
      opening_hours: "08:00",
      description:
        "Minima corporis fuga enim perspiciatis.\nEt itaque ipsum blanditiis eum pariatur ad.\nNostrum modi rerum ratione qui ut mollitia itaque dolores consequatur.\nAut explicabo ex nihil nam eligendi enim voluptas.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=47.984142526295706",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 50,
      name: "Jerome Wilderman",
      tel: "(221) 030-4589",
      address: "388 Hand Fort",
      opening_hours: "08:00",
      description:
        "Officia repudiandae tenetur. Placeat ullam placeat delectus. Perspiciatis possimus ex aut non nostrum reprehenderit consequuntur ipsa.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=42.90510482059571",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 8,
      name: "Leanna Walter",
      tel: "484.936.4654 x8160",
      address: "353 Tony Hills",
      opening_hours: "08:00",
      description:
        "Laudantium aut enim dolores. Consequatur consequuntur sed libero magnam exercitationem quo aspernatur molestias. Vel deserunt mollitia et dolore. Aut quibusdam inventore ex ratione quod fuga dignissimos.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=68.60531802638043",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 18,
      name: "Ernest Hermiston",
      tel: "181-762-8222 x2310",
      address: "340 Ankunding Heights",
      opening_hours: "08:00",
      description: "Et similique nihil.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=52.61220564251654",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 19,
      name: "Darby Bins",
      tel: "193.005.1414 x548",
      address: "1511 Schulist Port",
      opening_hours: "08:00",
      description:
        "Qui qui rem qui voluptatum. Quasi illum fuga sit laborum et nihil magnam. Quae architecto sit blanditiis sunt quae.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=10.369836806172628",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 28,
      name: "Deanna Tromp",
      tel: "523.233.4212 x44888",
      address: "2663 Balistreri Centers",
      opening_hours: "08:00",
      description: "aspernatur",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=89.58088606171648",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 38,
      name: "Mrs. Haylie Becker",
      tel: "1-207-967-6657 x216",
      address: "9372 Leone Fords",
      opening_hours: "08:00",
      description:
        "Odio ut pariatur sit. Perferendis libero quae blanditiis ut animi doloribus et perspiciatis quasi. Officia distinctio ut.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=90.30536647076211",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 42,
      name: "Alda Larson",
      tel: "(987) 308-8033 x58886",
      address: "0809 Gerhold Turnpike",
      opening_hours: "08:00",
      description: "Quia autem asperiores tempora similique.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=57.3754633806415",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 44,
      name: "Miss Quentin Boyer",
      tel: "362.186.6031 x225",
      address: "930 Torp Hills",
      opening_hours: "08:00",
      description:
        "Dicta sapiente odio voluptatum accusantium incidunt eum autem sed harum.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=97.58753499473505",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 48,
      name: "Halie Green",
      tel: "1-835-468-6750",
      address: "404 Larson Plaza",
      opening_hours: "08:00",
      description: "nemo",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=67.54262687369528",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 3,
      name: "Martin Bergstrom DVM",
      tel: "120.977.7402",
      address: "2407 Bednar Route",
      opening_hours: "08:00",
      description:
        "Eaque enim mollitia eius harum iusto.\nPerferendis vel cumque autem ipsum.\nLaudantium nemo enim ut veniam.\nDicta eius sunt facere ut voluptatem non ut.\nIpsum quod delectus.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=93.40818912127642",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 9,
      name: "Nestor Borer IV",
      tel: "902-447-7503",
      address: "1523 Maybelle Heights",
      opening_hours: "08:00",
      description: "Ut voluptas aut itaque commodi tenetur iure est aut.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=36.865143766377926",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 13,
      name: "Myrna Bruen",
      tel: "972.217.8730 x97497",
      address: "59680 Carter Union",
      opening_hours: "08:00",
      description:
        "Impedit at repellat est dolor assumenda. Sapiente atque qui corrupti. Et nihil ab temporibus molestiae qui asperiores maiores necessitatibus totam. Fuga similique dolores suscipit repellendus unde similique quis qui.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=23.41082749225516",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 17,
      name: "Alisa Runte",
      tel: "941.035.9786 x74772",
      address: "6354 Lola Mall",
      opening_hours: "08:00",
      description:
        "Eligendi omnis consequatur et facilis voluptas commodi dignissimos.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=50.054448744788615",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 21,
      name: "Kennedy Daniel DDS",
      tel: "1-215-820-9471 x705",
      address: "128 Elta Shores",
      opening_hours: "08:00",
      description: "ipsum",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=31.468531739976015",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 23,
      name: "Kyla Dicki",
      tel: "(244) 343-2350 x9352",
      address: "5382 Gustave Ramp",
      opening_hours: "08:00",
      description:
        "Molestiae dolores et accusamus earum tempora odio porro iure blanditiis. Dolorem culpa sunt pariatur autem ut quo. Tempore quos provident porro architecto.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=49.21884931059515",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 32,
      name: "Garrick Barton",
      tel: "908-411-0825",
      address: "78992 Fiona Green",
      opening_hours: "08:00",
      description: "sequi saepe doloremque",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=31.531015887547163",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 37,
      name: "Andreane Wilkinson",
      tel: "1-353-888-0376",
      address: "8219 Schinner Mission",
      opening_hours: "08:00",
      description:
        "Nemo et adipisci ex suscipit.\nIpsam ducimus ex quia consequuntur autem eum consequatur.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=7.046705369103345",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 39,
      name: "Hyman Rogahn",
      tel: "056-727-5427",
      address: "58346 Hugh Inlet",
      opening_hours: "08:00",
      description:
        "Quam ea expedita.\nFugiat facere saepe alias dignissimos molestiae qui.\nEius eius cumque suscipit debitis deserunt doloremque delectus quos iusto.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=56.784939046359284",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 47,
      name: "Octavia Mohr",
      tel: "590.218.3000 x513",
      address: "2308 Shanelle Falls",
      opening_hours: "08:00",
      description: "ut",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=0.11002669048221225",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 1,
      name: "Salma Witting",
      tel: "985-688-3156 x3929",
      address: "631 Orn Crossing",
      opening_hours: "08:00",
      description:
        "Nam praesentium dolores est omnis quibusdam harum aut. Adipisci dolorem velit libero quisquam velit est modi. Quis velit quas nisi. Officia et facilis. Voluptatem nihil dolores quasi sint voluptatem voluptatem recusandae.\n \rAspernatur est recusandae ut blanditiis nihil beatae nemo dolorum inventore. Deleniti commodi tempora incidunt consequatur aliquam aspernatur magnam. Ut doloremque iure. Perferendis enim consequatur suscipit quidem harum quo voluptatem. Dolorem enim rerum ut. Voluptas officia sint fuga dolorem.\n \rEum earum praesentium qui aut rerum quam ex. Consectetur magni repellat enim et. Vel quia quos dolor. Exercitationem asperiores ex molestiae et animi est est accusantium consequatur. Provident accusamus excepturi et tempora cumque laborum officiis rerum vel.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=52.48245367400537",
      viewCounts: 1,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-14T10:04:31.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 2,
      name: "Mr. Oswaldo Morar",
      tel: "147-862-4744",
      address: "4605 Howe Crossing",
      opening_hours: "08:00",
      description:
        "Officia voluptatem voluptas et excepturi corporis dolorem sit qui rem. Odit harum magni ut velit. Aut dignissimos consequatur autem rem est error. Sit sint vitae.\n \rQuis et impedit porro reprehenderit. Velit exercitationem fuga labore saepe. Qui neque sit eaque. Laborum praesentium ut dignissimos impedit sit sint.\n \rProvident eum vitae in totam. Vitae a sint. Aut inventore vitae eaque doloremque.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=94.00554442330656",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 6,
      name: "Elbert Okuneva",
      tel: "058-935-4403 x1138",
      address: "191 Denesik Meadows",
      opening_hours: "08:00",
      description:
        "Saepe soluta recusandae id aliquam eaque et deleniti. Voluptas et ut voluptatem sunt unde non consequatur odio. Sed sint doloribus voluptas a nobis ex exercitationem voluptas totam. Libero facilis in. Laboriosam et magnam. Porro provident ut in corrupti sit atque exercitationem nihil eum.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=81.18083288337752",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 7,
      name: "Mrs. Brooke Dooley",
      tel: "(324) 200-6646",
      address: "47074 Goldner Mountains",
      opening_hours: "08:00",
      description:
        "Necessitatibus numquam id quia non voluptas numquam iste enim numquam.\nHic ratione voluptates dignissimos fugiat voluptates.\nEt iure dolores sed temporibus dolore in ut debitis.\nUt et facilis possimus recusandae magnam explicabo quasi ut vero.\nUt delectus rerum.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=44.8569823212071",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 11,
      name: "Delaney Wilkinson",
      tel: "245.064.0643 x386",
      address: "372 Price Courts",
      opening_hours: "08:00",
      description:
        "Beatae blanditiis aut quam dolorem corporis aperiam placeat aut quae.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=90.82438937346642",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 12,
      name: "Weston Harber",
      tel: "1-119-673-5643 x73612",
      address: "342 Dare Village",
      opening_hours: "08:00",
      description:
        "Qui dolore non enim.\nPorro unde magnam non placeat et qui molestias.\nDeserunt consectetur sed pariatur asperiores voluptatem repellat veniam.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=39.298909760064184",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 15,
      name: "Anahi Toy",
      tel: "807-215-9626 x7590",
      address: "38423 Ivory Stream",
      opening_hours: "08:00",
      description:
        "Neque ipsa eveniet soluta aut laborum reprehenderit nihil sit.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=68.34309153735639",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 16,
      name: "Mrs. Cleora Hermiston",
      tel: "321-735-3037 x924",
      address: "064 Lavada Curve",
      opening_hours: "08:00",
      description:
        "Ut beatae ut vitae. Nam officia quidem quia. Consequatur libero cupiditate quia possimus nisi tempora neque eos accusamus. Fugiat consequuntur iure ex itaque numquam aperiam. Autem maxime accusantium.\n \rSimilique blanditiis eaque. Ad incidunt veniam nostrum sit fugit sit. Quam dolores consequatur rerum. Rerum deserunt odit cupiditate eligendi sequi. Quos dolorem ut ut vero nam molestias et. Et nulla molestias quisquam error sapiente architecto laborum provident.\n \rSequi molestiae illum et a eveniet. Iure enim aut quia maxime repudiandae reprehenderit consectetur et. Necessitatibus fugiat odit eligendi occaecati tempore est laboriosam ut reprehenderit.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=0.4981671162927359",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 25,
      name: "Angie Block",
      tel: "1-160-603-6529 x3556",
      address: "814 Eriberto Pine",
      opening_hours: "08:00",
      description: "tempore labore voluptatum",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=21.20733295780617",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 26,
      name: "Fleta Bauch",
      tel: "(042) 279-2046 x5228",
      address: "088 Smitham Cove",
      opening_hours: "08:00",
      description:
        "Voluptatem autem atque maxime autem a. Iure nihil porro minus quisquam. Eveniet at accusamus nihil ut pariatur. Dicta in facilis sed odit. Saepe nisi facilis dolor aut commodi magnam a commodi animi. Ipsum libero aut.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=26.947231618404267",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 29,
      name: "Bridie Emmerich",
      tel: "(140) 351-4460 x794",
      address: "02551 Carter Track",
      opening_hours: "08:00",
      description:
        "Totam labore ipsa.\nEligendi et accusamus voluptates mollitia mollitia eius id consectetur.\nEt rerum beatae aut.\nVero consequatur sapiente vitae qui quaerat eius amet.\nAd et ut delectus laudantium eum hic quia.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=77.24347492455618",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 31,
      name: "Katrine Reilly",
      tel: "1-779-863-1587",
      address: "69862 Earnestine Common",
      opening_hours: "08:00",
      description: "commodi",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=91.46352338668771",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 33,
      name: "Ms. Israel Turner",
      tel: "(882) 268-8041 x0178",
      address: "0783 Rowena Prairie",
      opening_hours: "08:00",
      description:
        "Repellendus nihil optio soluta tempore perferendis alias quis omnis. Enim dolores quas mollitia est reiciendis ipsam deleniti velit. Dolorum aut dignissimos autem est nemo temporibus consequatur animi. Impedit neque molestiae voluptas sed ut ipsa. Qui ea itaque ut quo tempore omnis. Praesentium ut unde eos.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=59.49778278373008",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
    {
      id: 49,
      name: "Nils McClure",
      tel: "210.410.2734 x649",
      address: "467 Wilmer Gardens",
      opening_hours: "08:00",
      description: "Ut quo ipsum voluptatem.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=69.62206999164466",
      viewCounts: 0,
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-09-12T12:57:08.000Z",
        updatedAt: "2022-09-12T12:57:08.000Z",
      },
    },
  ],
};

export default {
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants;
    },
    deleteRestaurant(restaurantId) {
      this.restaurants = this.restaurants.filter(restaurant => restaurant.id !==restaurantId)
    }
  },
};
</script>