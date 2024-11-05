<script setup>
import axios from "axios";
import Header from "../../components/Header.vue";
import BASE_URL from "../../configs";
import { onMounted, reactive, ref } from "vue";

const dataProducts = ref([]);
const showModalAdd = ref(false);
const showModalUpdate = ref(false);
const idProductUpdate = ref("");

const fetchData = async () => {
  try {
    const res = await axios.get(BASE_URL + "/products");
    dataProducts.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const handleOpenModalAdd = () => {
  showModalAdd.value = true;
};

const handleCloseModalAdd = () => {
  showModalAdd.value = false;
};

const handleCloseModalUpdate = () => {
  showModalUpdate.value = false;
};

onMounted(() => {
  fetchData();
});

const handleDelete = (id) => {
  if (confirm("Xác nhận xóa?")) {
    axios
      .delete(BASE_URL + "/products/" + id)
      .then(() => {
        alert("Xóa thành công");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const FormData = reactive({
  name: "",
  quantity: 0,
  creator: "",
});

const FormDataUpdate = reactive({
  name: "",
  quantity: 0,
  creator: "",
});

const handleOpenModalUpdate = (id) => {
  showModalUpdate.value = true;
  idProductUpdate.value = id;

  axios
    .get(BASE_URL + "/products/" + id)
    .then((res) => {
      console.log(res.data);
      FormDataUpdate.name = res.data.name;
      FormDataUpdate.quantity = res.data.quantity;
      FormDataUpdate.creator = res.data.creator;
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleUpdate = async () => {
  console.log(FormDataUpdate);
  console.log(idProductUpdate.value);

  try {
    axios.put(BASE_URL + "/products/" + idProductUpdate.value, FormDataUpdate);
    alert("Sửa thành công");
    showModalUpdate.value = false;
    fetchData();
  } catch (error) {
    console.log(error);
  }
};

const handleSubmitAdd = async () => {
  console.log(FormData);
  try {
    axios.post(BASE_URL + "/products", FormData);
    alert("Thêm sản phẩm thành công");
    fetchData();
    showModalAdd.value = false;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="w-4/5">
    <Header />
    <!-- Table -->
    <div class="w-full h-screen px-8 py-6 bg-[#e9eef2]">
      <div class="bg-white p-3 rounded-lg">
        <div class="mb-4 flex items-center gap-3">
          <input
            class="border border-[#ccc] px-3 py-1 rounded-md placeholder:text-sm"
            placeholder="Tên lô tem"
          />
          <input
            class="border border-[#ccc] px-3 py-1 rounded-md placeholder:text-sm"
            placeholder="Người tạo"
          />
          <div
            class="border border-[#ccc] px-3 py-1 rounded-md flex items-center gap-2 text-[#a0abb4] text-sm"
          >
            Từ ngày <input type="date" /> đến <input type="date" />
          </div>
          <input
            type="submit"
            class="border border-[#ccc] px-3 py-1 rounded-md bg-[#1dd078] text-white cursor-pointer"
            value="Search"
          />
        </div>
        <div
          @click="handleOpenModalAdd"
          class="bg-[#1dd078] text-white px-2 py-1 w-24 text-center mb-4 rounded-lg cursor-pointer"
        >
          Thêm mới
        </div>

        <!-- Table -->
        <table class="table-auto w-full">
          <thead class="bg-[#e9eef2]">
            <tr>
              <th
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#a0abb4]"
              >
                ID lô tem
              </th>
              <th
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#a0abb4]"
              >
                Tên lô tem
              </th>
              <th
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#a0abb4]"
              >
                Mã tem
              </th>
              <th
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#a0abb4]"
              >
                Tổng số lượng
              </th>
              <th
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#a0abb4]"
              >
                Đã kích hoạt
              </th>
              <th
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#a0abb4]"
              >
                Chưa kích hoạt
              </th>
              <th
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#a0abb4]"
              >
                Người tạo
              </th>
              <th
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#a0abb4]"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- <td colSpan="8" class="px-4 py-2 text-center text-[#a0abb4]">
                No Data
              </td> -->
            <tr v-for="product in dataProducts" :key="product.id">
              <td
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#525252] text-center"
              >
                {{ product.id }}
              </td>
              <td
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#525252] text-center"
              >
                {{ product.name }}
              </td>
              <td
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#525252] text-center"
              >
                {{ product.id_tem }}
              </td>
              <td
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#525252] text-center"
              >
                {{ product.quantity }}
              </td>
              <td
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#525252] text-center"
              >
                {{ product.active }}
              </td>
              <td
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#525252] text-center"
              >
                {{ product.notActive }}
              </td>
              <td
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#525252] text-center"
              >
                {{ product.creator }}
              </td>
              <td
                class="px-4 py-2 border-r-2 text-sm font-medium text-[#525252] text-center"
              >
                <div class="flex gap-3 items-center justify-center">
                  <div
                    class="bg-red-200 text-red-500 px-2 py-1 rounded-lg hover:bg-red-300 cursor-pointer"
                    @click="handleDelete(product.id)"
                  >
                    Delete
                  </div>
                  <div
                    class="bg-blue-200 text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-300 cursor-pointer"
                    @click="handleOpenModalUpdate(product.id)"
                  >
                    Update
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal add -->
    <div v-if="showModalAdd">
      <div
        class="bg-[#75767a] fixed inset-0 z-50 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white relative p-4 w-full max-w-lg">
          <h1 class="text-center text-lg font-bold mb-4">Tạo lô tem</h1>
          <form @submit.prevent="handleSubmitAdd">
            <div class="mb-2">
              <label for="" class="block mb-1">Tên lô tem</label>
              <input
                type="text"
                class="border w-full px-3 py-1 rounded-md"
                placeholder="Vui lòng nhập"
                v-model="FormData.name"
              />
            </div>
            <div class="mb-2">
              <label for="" class="block mb-1">Số lượng</label>
              <input
                type="numeber"
                class="border w-full px-3 py-1 rounded-md"
                placeholder="Vui lòng nhập"
                v-model="FormData.quantity"
              />
            </div>
            <div class="mb-6">
              <label for="" class="block mb-1">Người tạo</label>
              <input
                type="text"
                class="border w-full px-3 py-1 rounded-md"
                placeholder="Vui lòng nhập"
                v-model="FormData.creator"
              />
            </div>

            <div class="mb-2 flex gap-5 w-full justify-center items-center">
              <div
                @click="handleCloseModalAdd"
                class="bg-[#d6dde5] text-white py-1 w-2/5 text-center rounded-md cursor-pointer"
              >
                Hủy bỏ
              </div>
              <button
                type="submit"
                class="bg-[#1ed076] text-white py-1 w-2/5 text-center rounded-md"
              >
                Lưu lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Update -->
    <div v-if="showModalUpdate">
      <div
        class="bg-[#75767a] fixed inset-0 z-50 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white relative p-4 w-full max-w-lg">
          <h1 class="text-center text-lg font-bold mb-4">Sửa lô tem</h1>
          <form @submit.prevent="handleUpdate">
            <div class="mb-2">
              <label for="" class="block mb-1">Tên lô tem</label>
              <input
                type="text"
                class="border w-full px-3 py-1 rounded-md"
                placeholder="Vui lòng nhập"
                v-model="FormDataUpdate.name"
              />
            </div>
            <div class="mb-2">
              <label for="" class="block mb-1">Số lượng</label>
              <input
                type="numeber"
                class="border w-full px-3 py-1 rounded-md"
                placeholder="Vui lòng nhập"
                v-model="FormDataUpdate.quantity"
              />
            </div>
            <div class="mb-6">
              <label for="" class="block mb-1">Người tạo</label>
              <input
                type="text"
                class="border w-full px-3 py-1 rounded-md"
                placeholder="Vui lòng nhập"
                v-model="FormDataUpdate.creator"
              />
            </div>

            <div class="mb-2 flex gap-5 w-full justify-center items-center">
              <div
                @click="handleCloseModalUpdate"
                class="bg-[#d6dde5] text-white py-1 w-2/5 text-center rounded-md cursor-pointer"
              >
                Hủy bỏ
              </div>
              <button
                type="submit"
                class="bg-[#1ed076] text-white py-1 w-2/5 text-center rounded-md"
              >
                Lưu lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
