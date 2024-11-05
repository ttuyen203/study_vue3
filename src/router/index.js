import { createWebHistory, createRouter } from "vue-router";
import ClientLayout from "../layouts/ClientLayout.vue";
import ProductList from "../views/product/ProductList.vue";
import Dashboard from "../views/Dashboard.vue";
import Menu from "../views/menu.vue";

const routes = [
  {
    path: "/",
    component: ClientLayout,
    children: [
      {
        path: "",
        component: Dashboard,
      },
      {
        path: "product-list",
        component: ProductList,
      },
      {
        path: "menu",
        component: Menu,
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
