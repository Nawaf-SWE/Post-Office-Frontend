import { createRouter, createWebHistory } from "vue-router";
import jwt_decode from "jwt-decode";

import HomeLayout from "@/layouts/HomeLayout.vue";
import HomePage from "@/pages/Home.vue";
import AboutPage from "@/pages/About.vue";
import TrackingPage from "@/pages/TrackingPage.vue";
import LoginPage from "@/pages/Login.vue";
import SignUpPage from "@/pages/SignUp.vue";
import CustomerPackages from "@/pages/Customer/CustomerPackages.vue";
import SendPackage from "@/pages/Customer/SendPackage.vue";
import CustomerInfo from "@/pages/Customer/CustomerInfo.vue";

import AdminLayout from "@/layouts/AdminLayout.vue";
import CitiesView from "@/pages/admin/CitiesView.vue";
import CityDetail from "@/pages/admin/CityDetail.vue";
import BranchesView from "@/pages/admin/BranchesView.vue";
import ManageFees from "@/pages/admin/ManageFees.vue";
import ManageEmployees from "@/pages/admin/ManageEmployees.vue";
import ManagePackages from "@/pages/admin/ManagePackages.vue";
import ProfileView from "@/pages/admin/ProfileView.vue";

import NotFound from "@/pages/NotFound.vue";

const routes = [
    {
        path: "/",
        component: HomeLayout,
        children: [
            {
                path: "",
                component: HomePage,
                meta: {
                    role: ["free"],
                },
            },
            {
                path: "about",
                component: AboutPage,
                meta: {
                    role: ["free"],
                },
            },
            {
                path: "package",
                component: CustomerPackages,
                meta: {
                    role: ["client"],
                },
            },
            {
                path: "package/new",
                component: SendPackage,
                meta: {
                    role: ["client"],
                },
            },
            {
                path: "tracking/:tracking_no",
                component: TrackingPage,
                meta: {
                    role: ["free"],
                },
            },
            {
                path: "login",
                component: LoginPage,
                meta: {
                    role: ["free"],
                },
            },
            {
                path: "signup",
                component: SignUpPage,
                meta: {
                    role: ["free"],
                },
            },
            {
                path: "me",
                component: CustomerInfo,
                meta: {
                    role: ["client"],
                },
            },
        ],
    },
    {
        path: "/admin/",
        component: AdminLayout,
        children: [
            {
                path: "",
                component: CitiesView,
                name: "CitiesView",
                meta: {
                    role: ["admin"],
                },
                // GET + POST City
            },
            {
                path: "branches",
                component: CityDetail,
                name: "Branches",
                meta: {
                    role: ["admin"],
                },
                // GET branches for city with 'id'
                // GET + POST User as 'City Manager' <- next phase
            },
            {
                path: "branches/:id",
                component: BranchesView,
                meta: {
                    role: ["admin"],
                },
                // GET + POST User as 'Branch Manager' <- next pahse
                // add form.branch_id = this.$route.params.id
                // TODO: safe delete
            },
            {
                path: "fees",
                component: ManageFees,
                name: "ManageFees",
                meta: {
                    role: ["admin"],
                },
                // GET + PUT Fee
            },
            {
                path: "employees",
                component: ManageEmployees,
                name: "ManageEmployees",
                meta: {
                    role: ["admin"],
                },
                // GET + POST Employees
            },
            {
                path: "packages",
                component: ManagePackages,
                name: "ManagePackages",
                meta: {
                    role: ["admin", "manager"],
                },
                // GET + POST Packages
            },
            {
                path: "me",
                component: ProfileView,
                name: "ProfileView",
                meta: {
                    role: ["admin", "manager", "support", "deliveryman"],
                },
                // GET + POST Packages
            },
        ],
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound, // Replace with your 404 component
        meta: {
            role: ["free"],
        },
    },
];

const router = createRouter({
    routes: routes,
    history: createWebHistory(),
});

router.beforeEach(async (route, _, next) => {
    if (route.meta.role.includes("free")) {
        next();
        return;
    }
    if (localStorage["token"]) {
        const data = await jwt_decode(localStorage["token"]);
        if (route.meta.role.includes(data?.role)) {
            next();
        } else {
            next({ path: "/" });
        }
    }
});

export default router;
