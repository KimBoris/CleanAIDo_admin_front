export default {
data() {
return {
customers: [
{ id: "customer1@aaa.com", name: "김태영", birthDate: "1992-01-18", createdDate: "2024. 11. 26. 오후 3:16:18", phone: "010-3267-2452", address: "울산" },
{ id: "customer2@aaa.com", name: "박소준", birthDate: "1992-01-17", createdDate: "2024. 11. 26. 오후 3:16:18", phone: "010-3267-2451", address: "부산" },
// ... 다른 고객 데이터
],
hoveredCustomerId: null,
};
},
methods: {
handleMouseOver(customerId) {
this.hoveredCustomerId = customerId;
console.log("Hovered Customer ID:", customerId); // 콘솔에서 확인
},
},
};
