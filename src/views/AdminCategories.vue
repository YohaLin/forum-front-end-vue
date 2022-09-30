<template>
  <div>
    <Spinner v-if="isLoading"/>
    <div v-else class="container py-5">
      <!-- 1. 使用先前寫好的 AdminNav -->
      <AdminNav />

      <form class="my-4">
        <div class="form-row">
          <div class="col-auto">
            <input
              type="text"
              class="form-control"
              placeholder="新增餐廳類別..."
              v-model="newCategoryName"
            />
          </div>
          <div class="col-auto">
            <button
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="createCategory"
            >
              新增
            </button>
          </div>
        </div>
      </form>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col" width="60">#</th>
            <th scope="col">Category Name</th>
            <th scope="col" width="210">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <th scope="row">
              {{ category.id }}
            </th>
            <td class="position-relative">
              <div v-show="!category.isEditing" class="category-name">
                {{ category.name }}
              </div>
              <input
                v-show="category.isEditing"
                v-model="category.name"
                type="text"
                class="form-control"
              />
              <span
                v-show="category.isEditing"
                class="cancel"
                @click.stop.prevent="handleCancel(category.id)"
              >
                ✕
              </span>
            </td>
            <td class="d-flex justify-content-between">
              <button
                v-show="!category.isEditing"
                type="button"
                class="btn btn-link mr-2"
                @click.stop.prevent="toggleIsEditing(category.id)"
              >
                Edit
              </button>
              <button
                v-show="category.isEditing"
                type="button"
                class="btn btn-link mr-2"
                @click.stop.prevent="
                  updateCategory({
                    categoryId: category.id,
                    name: category.name,
                  })
                "
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-link mr-2"
                @click.stop.prevent="deleteCategory(category.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { v4 as uuidv4 } from "uuid";
import AdminNav from "@/components/AdminNav";
import adminAPI from "./../apis/admin";
import Spinner from './../components/Spinner'
import { Toast } from "./../utils/helpers";

export default {
  name: "AdminCategories",
  components: {
    AdminNav,
    Spinner
  },
  data() {
    return {
      categories: [],
      newCategoryName: "",
      isLoading: false,
      isProcessing: false
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.categories.get();

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.categories = data.categories.map((category) => ({
          ...category,
          isEditing: false, // 新增修改中的狀態
          nameCached: "", // 拿來放修改前暫存的類別名稱
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳類別資料，請稍後再試",
        });
      }
    },
    async createCategory(name) {
      // 透過API向後端伺服器新增餐廳類別
      try {
        this.isProcessing = true
        const { data } = await adminAPI.categories.create({
          name: this.newCategoryName
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.categories.push({
          id: data.categoryId,
          name: this.newCategoryName,
          isEditing: false
        });

        this.newCategoryName = '';
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法建立餐廳類別資料，請稍後再試",
        });
      }
    },
    async deleteCategory(categoryId) {
      // 透過API向後端伺服器刪除餐廳類別
      try {
        this.isProcessing = true
        const { data } = await adminAPI.categories.delete({categoryId});

        console.log(data)
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );

        Toast.fire({
          icon: "success",
          title: "建立餐廳類別資料成功",
        });

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法刪除餐廳類別資料，請稍後再試",
        });
      }
    },
    async updateCategory({ categoryId, name }) {
      // 透過API向伺服器更新類別名稱
      try {
        this.isProcessing = true
        const { data } = await adminAPI.categories.update({
          categoryId,
          name
        });

        console.log(data)
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.toggleIsEditing(categoryId);

        Toast.fire({
          icon: "success",
          title: "修改餐廳類別資料成功",
        });

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法刪除餐廳類別資料，請稍後再試",
        });
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name,
          };
        }
        return category;
      });
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            // 把原本的餐廳類別名稱還回去
            name: category.nameCached,
          };
        }
        return category;
      });

      this.toggleIsEditing(categoryId);
    },
  },
};
</script>

<!-- scoped: 代表這邊的CSS屬性只會套用在這個vue檔案裡面，如果其他檔案有想同的classname，不會去干擾 -->
<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>