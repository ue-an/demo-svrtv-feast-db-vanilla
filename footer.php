</body>
<!-- added script related to admin ui -->
<!-- tables scripts -->
<script src="js/script.js"></script>
<script src="js/script_events.js"></script>
<script src="js/script_events_orders.js"></script>
<script src="js/script_events_ticket.js"></script>
<script src="js/script_fmm.js"></script>
<script src="js/script_feastph.js"></script>
<script src="js/script_hwr.js"></script>
<script src="js/script_feastmedia.js"></script>
<script src="js/script_feastapp.js"></script>
<script src="js/script_feastbook_products.js"></script>
<script src="js/script_feastbook_orders.js"></script>
<script src="js/script_feastbook_transactions.js"></script>

<script src="js/bootstrap.bundle.min.js"></script>
    <script>

        //dropdowns
        // var deliverable = document.getElementById("isBonafied");
        // var deliverableVal = deliverable.style.getPropertyValue;
        // var deliver_option1 = document.getElementById("deliverable-dd1");
        // var deliver_option2 = document.getElementById("deliverable-dd2");

        // function changeDeliverOptionValue() {
        //     deliver_option1.nodeValue = deliverableVal == "0" ? "true" : "false";
        //     deliver_option2.nodeValue = deliver_option1.style.getPropertyValue == "true" ? "false" : "true";
        // }
        //end-dropdowns

        var el = document.getElementById("wrapper");
        var toggleButton = document.getElementById("menu-toggle");

        toggleButton.onclick = function() {
            el.classList.toggle("toggled");
        };

        var user_table = document.getElementById("row-userstable");
        var event_order_table = document.getElementById("row-eventsorderstable");
        var event_ticket_table = document.getElementById("row-eventstickettable");
        var events_table = document.getElementById("row-eventstable");
        var fmm_table = document.getElementById("row-fmmtable");
        var feastph_table = document.getElementById("row-feastphtable");
        var hwr_table = document.getElementById("row-hwrtable");
        var feastmedia_table = document.getElementById("row-feastmediatable");
        var feastapp_table = document.getElementById("row-feastapptable");
        var fbproduct_table = document.getElementById("row-feastbookproductstable");
        var fborder_table = document.getElementById("row-feastbookorderstable");
        var fbtransaction_table = document.getElementById("row-feastbooktransactionstable");

        let tables = [
            user_table,
            event_order_table,
            event_ticket_table,
            fmm_table,
            hwr_table,
            feastph_table,
            feastmedia_table,
            feastapp_table,
            fbproduct_table,
            fborder_table,
            fbtransaction_table,
            events_table,
        ];

        $(document).ready(function() {
            user_table.style.display = "block";
            tables.forEach(table => {
                if (table.id !== "row-userstable") {
                    table.style.visibility = "hidden";
                    console.log(table);
                }
            })
        });

        function closeAll($selectedTable){
            tables.forEach(table => {
                if (table.id !== $selectedTable) {
                    table.style.display = "none";
                    table.style.visibility = "hidden";
                }
            });
        }

        //Users menu
        function openSideUsers() {
            user_table.style.visibility = "visible";
            user_table.style.display = "block";
            closeAll(user_table.id);
        }

        //Event side menu
        function openSideEventOrders() {
            event_order_table.style.visibility = "visible";
            event_order_table.style.display = "block";
            closeAll(event_order_table.id);
        }

        function openSideEventTickets() {
            event_ticket_table.style.visibility = "visible";
            event_ticket_table.style.display = "block";
            closeAll(event_ticket_table.id);
        }

        function openSideFMM() {
            fmm_table.style.visibility = "visible";
            fmm_table.style.display = "block";
            closeAll(fmm_table.id);
        }

        function openSideFeastph() {
            feastph_table.style.visibility = "visible";
            feastph_table.style.display = "block";
            closeAll(feastph_table.id);
        }

        function openSideHWR() {
            hwr_table.style.visibility = "visible";
            hwr_table.style.display = "block";
            closeAll(hwr_table.id);
        }

        function openSideFeastmedia() {        
            feastmedia_table.style.visibility = "visible";
            feastmedia_table.style.display = "block";
            closeAll(feastmedia_table.id);
        }

        function openSideFeastapp() {
            feastapp_table.style.visibility = "visible";
            feastapp_table.style.display = "block";
            closeAll(feastapp_table.id);
        }

        function openSideFbProducts() {
            fbproduct_table.style.visibility = "visible";
            fbproduct_table.style.display = "block";
            closeAll(fbproduct_table.id);
        }

        function openSideFbOrders() {
            fborder_table.style.visibility = "visible";
            fborder_table.style.display = "block";
            closeAll(fborder_table.id);
        }

        // function openSideEvents() {
        //     events_table.style.visibility = "visible";
        //     events_table.style.display = "block";
        //     closeAll(events_table.id);
        // }

        function dropDownBonafied(e) {
            document.getElementById("bonafied").value = e.target.value
        }
        
    </script>
</html>