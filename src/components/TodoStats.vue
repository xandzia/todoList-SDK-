<template>
    <table>
        <thead align="center">
            <tr>
                <th colspan="2">
                    STATS
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Deals</td>
                <td class="color-blue">{{ deal }}</td>
            </tr>
            <tr>
                <td>Deals left</td>
                <td class="color-blue">{{ dealLeft }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "TodoStats",
        props: {
            deal: {
                type: Number,
                default: 0
            },
            dealLeft: {
                type: Number,
                default: 0
            }
        },
    }
</script>

<style lang="scss" scoped>
    table {
        border-collapse: collapse;
        border-spacing: 0;
        min-width: 200px;
    }
    .list-stats {
        thead tr th {
            padding: 5px 10px;
        }
        tbody {
            border-radius: 2px;
            box-shadow: 0 0 2px 0 rgba(0,0,0,0.32), 0 0px 0px 0 rgba(0,0,0,0.24);
            td {
                padding: 5px 10px;
                text-align: right;
                font-size: 14px;
            }
            tr td:first-child {
                text-align: left;
            }
        }
    }

</style>