<template>
    
    <!-- Toolbar -->
    <v-toolbar>

      <v-toolbar-title>{{ t('menu_product') }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn prepend-icon="mdi-plus-circle-outline" @click="openAddDialog">{{ t('add_product') }}</v-btn>

    </v-toolbar>

    <!-- Table -->
    <v-table>
        <thead>
            <tr>
                <th class="text-left" style="background-color: teal; color: #fff;">#</th>
                <th class="text-left" style="background-color: teal; color: #fff;">{{ t('product_name') }}</th>
                <th class="text-left" style="background-color: teal; color: #fff;">{{ t('product_price') }}</th>
                <th class="text-end" style="background-color: teal; color: #fff;">{{ t('product_manage') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(product, index) in products"
                :key="index"
            >
                <td>{{ Object.keys(products).length - index }}</td>
                <!-- <td>{{ locale == 'th' ? product.name_th : product.name }}</td> -->
                <td>{{ product.name }}</td>
                <td>{{ locale == 'th' ?  toCurrency(product.price * 36) + ' บาท' : '$ '+ toCurrency(product.price)}}</td>
                <td class="text-end" style="width: 110px;">
                    <v-btn color="info" size="x-small" icon="mdi-pencil" class="mr-2" @click="openEditDialog(product)"></v-btn>
                    <v-btn color="error" size="x-small" icon="mdi-delete" @click="openDeleteDialog(product.id)"></v-btn>
                </td>
            </tr>
            
        </tbody>
    </v-table>

    <!-- Dialog Add / Edit -->
    <v-dialog
        v-model="dialog"
        persistent
        width="300"
        >
        <v-card>

        <v-card-title>
          <span class="text-h5">{{ updateState ? t('edit_product') : t('add_product') }}</span>
        </v-card-title>
        
        <v-card-text>
          
            <v-row>
              <v-col>
                <v-text-field
                  :label="t('product_name')"
                  v-model="product.name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  :label="t('product_price') + ' (USD)'"
                  type="number"
                  v-model="product.price"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red"
            variant="text"
            @click="closeDialog"
          >
            {{ t('btn_close' )}}
          </v-btn>

          <v-btn
            v-if="!updateState"
            color="blue-darken-1"
            variant="text"
            @click="addProduct"
          >
            {{ t('btn_save' )}}
          </v-btn>

          <v-btn
            v-if="updateState"
            color="blue-darken-1"
            variant="text"
            @click="updateProduct"
          >
            {{ t('btn_update' )}}
          </v-btn>
        </v-card-actions>

      </v-card>
        
    </v-dialog>

    <!--  Dialog Confirm Delete -->
    <v-dialog
      v-model="dialog_delete"
      width="300"
      persistent
    >
    <v-card>
        <v-card-title class="text-h5">
          {{ t('msg_confirm_del_title') }}
        </v-card-title>
        <v-card-text>{{ t('msg_confirm_del_subtitle') }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="dialog_delete=false"
          >
            {{ t('btn_no') }}
          </v-btn>
          <v-btn
            color="red"
            variant="text"
            @click="deleteProduct"
          >
          {{ t('btn_yes_delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import { toCurrency } from '../shared/utils'
import { ref , onMounted } from 'vue'
import { db } from '../plugins/firebase'

// Use i18n
let { t, locale } = useI18n({
    inheritLocale: true,
    useScope: 'global'
})

// Constant for dialog close / open
const dialog = ref(false)
const dialog_delete = ref(false)

// const for product model input
const product = ref({
    name: '',
    price: ''
})

// const for product array from firebase
const products: any = ref([])

// const for product update
const productTemp: any = ref({})

// const for check state update
const updateState = ref(false)

// const for delete product id
const product_id = ref("")

console.log(typeof product_id)

// Open Add Product Dialog
const openAddDialog = () => {
    dialog.value = true
    product.value.name = ""
    product.value.price = ""
}

// Open Edit Product Dialog
const openEditDialog = (prdTemp: any) => {

    // Open Dialog
    dialog.value = true

    // Update State
    updateState.value = true

    // Set Value
    productTemp.value = prdTemp
    product.value.name = prdTemp.name
    product.value.price = prdTemp.price
}

// Open Delete Product Dialog
const openDeleteDialog = (pid: any) => {
    dialog_delete.value = true
    // Set Value
    product_id.value = pid
}

// Close Dialog
const closeDialog = () => {
    // Update State
    updateState.value = false
    dialog.value = false
}

// Const for count new add product
const count:any = ref(0)

// Fetch Products
onMounted(() => {

    db.collection("products")
    .orderBy('created_at', 'desc')
    .onSnapshot((querySnapshot) => {
        products.value = []
        querySnapshot.forEach((doc) => {
            products.value.push(doc.data()) 
            // console.log(products.value[0])
        })
    })
    
    // Count new product
    db.collection("product_counts")
    .onSnapshot((querySnapshot) => {
        count.value = querySnapshot.docs[0].data()
        // console.log(count.value.total)
    })
})

// Add new Product
const addProduct = () => {
    db.collection("products")
    .add({
        id: "",
        name: product.value.name,
        price: product.value.price,
        created_at: Date.now(),
        
    })
    .then(function(docref) {
        console.log(docref.id)
        db.collection("products")
        .doc(docref.id)
        .update({ id: docref.id })
    })
    product.value.name = ""
    product.value.price = ""

    // update store count
    // store.count += 1
    db.collection("product_counts")
    .doc('p_count')
    .update({
        total: count.value.total + 1,
    })
}

// Update Product
const updateProduct = () => {
    let p = product.value
    // console.log(p)
    db.collection("products")
    .doc(productTemp.value.id)
    .update({
        name: p.name,
        price: p.price
    })
    
    product.value.name = ""
    product.value.price = ""

    // Update State
    updateState.value = false

    // Close Dialog
    dialog.value = false
}

// Delete Product
const deleteProduct = () => {
    db.collection("products")
    .doc(product_id.value)
    .delete()

    // close delete dialog
    dialog_delete.value = false
}

</script>

<style scoped>

  .v-table > .v-table__wrapper > table > tbody > tr > td, .v-table > .v-table__wrapper > table > thead > tr > td, .v-table > .v-table__wrapper > table > tfoot > tr > td {
    font-size: 14px !important;
  }

</style>