if [ -z "$2" ]
then
    packages=$(jq '.packages | to_entries[] | "\(.key)/\(.value[])"' package.json | sed 's/"//g')
else
    packages=$(jq -r ".packages.${2} // [] | map(\"$2/\(.)\") | join(\" \")" package.json)
fi
for package in $packages
do
    len=$(expr ${#1} + ${#package} + 24)
    dash=""
    for i in $(seq 0 $((len-1))); do
        dash="${dash}-"
    done
    echo "\033[35m ┌$dash┐\033[0m"
    echo "\033[35m |    $1ing package $package....    |\033[0m"
    echo "\033[35m └$dash┘\033[0m"
    sh ./common/scripts/$1.sh "./packages/$package"
done
