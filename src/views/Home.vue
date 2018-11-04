<template>
  
	<main class="full-vp">
	
		<!-- catalog header -->
		<vs-row vs-justify="center" vs-align="center" vs-w="12">

			<!-- logo, company name, section name -->
			<vs-col class="ph-text-center " vs-w="4" vs-xs="12">
				<h1>Apparel Pharaoh</h1>
				<h4>Catalog</h4>
			</vs-col>

		</vs-row>


		<!-- rows of apparel items -->
		<vs-row 
			vs-justify="space-around" 
			vs-align="center"
			vs-w="12"
			type="flex"
			class="catalog-wrapper">
			
			<vs-col 
				v-for="item,index in catalogItems"
				:key="index"

				type="flex"
				vs-xs="12" vs-sm="5" vs-lg="4"

				class="catalog-col"
			>
				<vs-card actionable class="catalog-item" fixedHeight>

					<div slot="header">
						<p>{{item.name}}</p>
					</div>

					<div slot="media">
						<img :src="item.imgSrc" class="catalog-item-img">
					</div>

					<div slot="footer">
						<p>
							{{item.price}}
						</p>
					</div>
				</vs-card>

			</vs-col>

		</vs-row>

	</main>

</template>


<script>

export default {

	name: "Home",

	data() {
		return {

			catalogItems: [
				{
					name: "Versace",
					price: "$300",
					imgSrc: "black_dress.png"
				},
				{
					name: "Supreme",
					price: "$60",
					imgSrc: "suit.jpg"
				},
				{
					name: "Gucci Belt",
					price: "$150",
					imgSrc: "tan_w_hat.png"
				},
				{
					name: "Hanes Tee",
					price: "$10",
					imgSrc: "white_sweater.jpeg"
				},
				{
					name: "Janowski",
					price: "$55",
					imgSrc: "pink_dress.png"
				}
			]
		}
	}

};

</script>

<style>
.catalog-wrapper {
	/* background-color: lightgrey; */
}
.catalog-col {
	padding: 15px;
	height: 45vh;
}
.catalog-item {
	margin: 0px;
	padding: 5px;
}
.catalog-item-img {
	height: 30vh;
	object-fit: contain;
}


.ph-h-100 {
	height: 100%;
}
.full-vp {
	height: 100vh;
}

.ph-obj-fit-contain {
	object-fit: contain;
}

.ph-text-center {
    text-align: center;
}
.ph-mt-2 {
	margin-top: 20px;
}

.ph-ms-2 {
	margin-left: 20px;
	margin-right: 20px;
}

.ph-vh-40 {
	height: 40vh;
}
</style>